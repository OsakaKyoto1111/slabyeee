const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const updateUserRole = asyncHandler(async (req, res) => {
  const { userId, newRole } = req.body;

  if (!['USER', 'HEAD', 'ADMIN'].includes(newRole)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("Not found");
  }

  user.role = newRole;
  await user.save();

  res.status(200).json({user});
});

module.exports = { updateUserRole };
