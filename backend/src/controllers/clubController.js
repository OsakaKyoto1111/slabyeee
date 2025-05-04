const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Club = require("../models/Club");
const Event = require("../models/Event");
const Application = require("../models/Application");
const User = require("../models/User")
const getClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
});

const createClub = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const club = await Club.create({ name, description });
  res.status(201).json(club);
});

const getClubApplicationsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("userId is required");
  }

  const clubs = await Club.find({ owner: userId });
  if (clubs.length === 0) {
    return res.status(404).json({ message: "No clubs found for this owner" });
  }

  const clubIds = clubs.map(c => c._id);

  const events = await Event.find({ clubId: { $in: clubIds } }).select('_id');
  const eventIds = events.map(e => e._id);

  const applications = await Application.find({ eventId: { $in: eventIds } })
    .populate('userId', 'fullName email')
    .populate('eventId', 'title dateTime');

  res.json(applications);
});
const addOwnerToClub = asyncHandler(async (req, res) => {
  const { clubId,email } = req.body;

  if (!email || !clubId) {
    res.status(400);
    throw new Error("email and clubId are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const club = await Club.findById(clubId);
  if (!club) {
    res.status(404);
    throw new Error("Club not found");
  }

  club.owner = user._id;
  await club.save();

  res.status(200).json({ message: "Owner assigned", club });
});
module.exports = {
  getClubs,
  createClub,
  getClubApplicationsByUserId,addOwnerToClub
};
