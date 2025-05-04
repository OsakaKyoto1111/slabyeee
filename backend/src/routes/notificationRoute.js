const express = require("express");

const {
    getNotifications,
    getNotificationById,
    createNotification,
    markAsRead,
    getNotificationsByUserId // ✅ добавили
} = require("../controllers/notificationController");

const router = express.Router();

// Get all notifications
router.get("/", getNotifications);

// Get notifications by User ID (ВАЖНО ДО id)
router.get("/user/:userId", getNotificationsByUserId);

// Get notification by ID
router.get("/:id", getNotificationById);

// Create notification
router.post("/", createNotification);

// Mark as read
router.put("/:id/read", markAsRead);

module.exports = router;
