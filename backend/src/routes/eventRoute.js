const upload = require("../middlewares/upload")
const express = require("express");
const {
    getEvents,
    getEventById,
    createEvent,
    deleteEvent
  } = require("../controllers/eventController");
  
  const router = express.Router();
  
  router.get("/", getEvents);
  
  router.get("/:id", getEventById);
  
  router.post("/", upload.array("images", 5), createEvent);  
  router.delete("/:id", deleteEvent);
  
  module.exports = router;