const express = require("express");

const {
    getTickets,
    getTicketById,
    buyTicket,
    approveTicket,
    rejectTicket
  } = require("../controllers/ticketController");
  
  const router = express.Router();
  
  router.get("/", getTickets);
  router.get("/:id", getTicketById);
  router.post("/", buyTicket);
  router.put("/:id/approve", approveTicket);
  router.put("/:id/reject", rejectTicket);
  
  module.exports = router;