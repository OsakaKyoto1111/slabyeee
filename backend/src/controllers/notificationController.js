const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification")
// Get all notifications
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().populate("userId eventId");
  res.status(200).json(notifications);
});

// Get notification by ID
const getNotificationById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const notification = await Notification.findById(id).populate("userId eventId");

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  res.status(200).json(notification);
});
// Get notifications by User ID
const getNotificationsByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const notifications = await Notification.find({ userId }).populate("userId eventId");

  res.status(200).json(notifications);
});

// Create notification
const createNotification = asyncHandler(async (req, res) => {
  const { userId, eventId, type, title, message } = req.body;

  if (!userId || !type || !title || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const notification = await Notification.create({
    userId,
    eventId,
    type,
    title,
    message
  });

  res.status(201).json(notification);
});

// Mark notification as read
const markAsRead = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const notification = await Notification.findById(id);

  if (!notification) {
    res.status(404);
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json(notification);
});

module.exports = { getNotifications, getNotificationById, createNotification, markAsRead,getNotificationsByUserId};