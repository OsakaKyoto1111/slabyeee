const bcrypt = require("bcryptjs");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    res.status(400);
    throw new Error("Validation error");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(405);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword
  });

  const token = jwt.sign(
    {
      userId: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5h" }
  );

  res.status(201).json({ token });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Password is not correct");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      fullName: user.fullName,
      email: user.email
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5h" }
  );

  res.status(200).json({ token });
});

module.exports = { register, login };