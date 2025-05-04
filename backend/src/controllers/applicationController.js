const asyncHandler = require("express-async-handler");
const Application = require("../models/Application");
const Event = require("../models/Event");
const Club = require("../models/Club");
const Notification = require("../models/Notification");
const mongoose = require("mongoose");

const getApplications = asyncHandler(async (req,res) => {
    const app = await Application.find();

    res.status(201).json(app);
})

const createApplication = asyncHandler(async (req, res) => {
  const { eventId, userId } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const application = new Application({
    eventId,
    userId,
    status: 'PENDING'
  });

  await application.save();
  res.status(201).json(application);
});

const approveApplication = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const { userId } = req.body; 
  
    if (!userId) {
      res.status(400);
      throw new Error("userId is required");
    }
  
    const application = await Application.findById(applicationId).populate("eventId");
    if (!application) {
      res.status(404);
      throw new Error("Application not found");
    }
  
    const event = application.eventId;
    const club = await Club.findById(event.clubId);
    if (!club) {
      res.status(404);
      throw new Error("Club not found");
    }
  
    if (!club.owner.equals(new mongoose.Types.ObjectId(userId))) {
      res.status(403);
      throw new Error("Access denied: you are not the club owner");
    }
  
    if (application.status === "APPROVED") {
      res.status(400);
      throw new Error("Application already approved");
    }
  
    if (event.availableTickets <= 0) {
      res.status(400);
      throw new Error("No available tickets");
    }
  
    // Обновить статус заявки
    application.status = "APPROVED";
    await application.save();
  
    // Уменьшить количество доступных билетов
    event.availableTickets -= 1;
    await event.save();
  
    // Отправить уведомление пользователю
    await Notification.create({
      userId: application.userId,
      eventId: event._id,
      type: "APPLICATION",
      title: "Заявка одобрена",
      message: `Ваша заявка на "${event.title}" была одобрена.`,
    });
  
    res.json({ message: "Application approved", application });
  });
  

module.exports = {
  createApplication,
  approveApplication,getApplications
};
