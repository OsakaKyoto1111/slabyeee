const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");
const Ticket = require("../models/Ticket")

// Get all tickets
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().populate("eventId userId paymentId");
  res.status(200).json(tickets);
});

// Get ticket by ID
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate("eventId userId paymentId");

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  res.status(200).json(ticket);
});

// Buy ticket
const buyTicket = asyncHandler(async (req, res) => {
  const { eventId, userId, checkFile } = req.body;

  if (!eventId || !userId) {
    res.status(400);
    throw new Error("Event ID and User ID are required");
  }

  const event = await Event.findById(eventId);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (event.availableTickets <= 0) {
    res.status(400);
    throw new Error("No tickets available");
  }

  // Decrease available tickets
  event.availableTickets -= 1;
  await event.save();

  const ticket = await Ticket.create({
    eventId,
    userId,
    qrCode: Math.random().toString(36).substring(2, 10),
    status: "ACTIVE",
    purchaseStatus: event.isFree ? "APPROVED" : "PENDING",
    checkFile: checkFile || null
  });

  res.status(201).json(ticket);
});

// Approve ticket (HEAD or ADMIN)
const approveTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  ticket.purchaseStatus = "APPROVED";
  await ticket.save();

  res.status(200).json(ticket);
});

// Reject ticket
const rejectTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  ticket.purchaseStatus = "REJECTED";
  await ticket.save();

  res.status(200).json(ticket);
});

module.exports = { getTickets, getTicketById, buyTicket, approveTicket, rejectTicket };