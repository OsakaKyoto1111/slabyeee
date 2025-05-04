const express = require("express");


const { getVenues, getVenueById, createVenue } = require("../controllers/venueController");

const router = express.Router();

router.get("/", getVenues);
router.get("/:id", getVenueById);
router.post("/", createVenue);

module.exports = router;