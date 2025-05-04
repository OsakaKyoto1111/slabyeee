const asyncHandler = require("express-async-handler");
const Venue = require("../models/Venue")
const getVenues = asyncHandler(async (req, res) => {
  const venues = await Venue.find();
  res.status(200).json(venues);
});

const getVenueById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const venue = await Venue.findById(id);

  if (!venue) {
    res.status(404);
    throw new Error("Venue not found");
  }

  res.status(200).json(venue);
});

const createVenue = asyncHandler(async (req, res) => {
  const { name, capacity } = req.body;

  if (!name || !capacity) {
    res.status(400);
    throw new Error("Name and capacity are required");
  }

  const venue = await Venue.create({
    name,
    capacity
  });

  res.status(201).json(venue);
});

module.exports = { getVenues, getVenueById, createVenue };