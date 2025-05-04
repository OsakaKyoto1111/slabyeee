const Venue = require("../models/Venue");
const Club = require("../models/Club");
const asyncHandler = require("express-async-handler");
const Event = require("../models/Event")
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate("clubId venueId");
  res.status(200).json(events);
});

const getEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error("Validation error");
  }

  const event = await Event.findById(id).populate("clubId venueId");

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json(event);
});

const createEvent = asyncHandler(async (req, res) => {
  const {
    title, dateTime, clubId, venueId,
    totalTickets, isFree, bankNumber
  } = req.body;

  if (!title  || !dateTime  || !clubId  || !venueId  || totalTickets === undefined) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!isFree && !bankNumber) {
    res.status(400);
    throw new Error("Bank number is required for paid events");
  }

  const club = await Club.findById(clubId);
  const venue = await Venue.findById(venueId);

  if (!club || !venue) {
    res.status(404);
    throw new Error("Club or Venue not found");
  }

  // Получаем ссылки на загруженные изображения
  const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

  const event = await Event.create({
    title,
    dateTime,
    clubId,
    venueId,
    totalTickets,
    availableTickets: totalTickets,
    isFree: isFree || false,
    bankNumber: isFree ? null : bankNumber,
    images
  });

  res.status(201).json(event);
});


const deleteEvent = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error("Validation error");
  }

  const event = await Event.findByIdAndDelete(id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json({ message: "Event deleted" });
});

module.exports = { getEvents, getEventById, createEvent, deleteEvent };