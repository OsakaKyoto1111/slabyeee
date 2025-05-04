const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error("Validation error");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

const deleteUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error("Validation error");
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User deleted" });
});

module.exports = { getAllUsers, getUserById, deleteUserById };