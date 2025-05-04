const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment")

const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate("userId");
  res.status(200).json(payments);
});


const getPaymentById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const payment = await Payment.findById(id).populate("userId");

  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }

  res.status(200).json(payment);
});


const createPayment = asyncHandler(async (req, res) => {
  const { userId, amount, paymentMethod } = req.body;

  if (!userId || !amount || !paymentMethod) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const payment = await Payment.create({
    userId,
    amount,
    paymentMethod,
    status: "PENDING"
  });

  res.status(201).json(payment);
});

module.exports = { getPayments, getPaymentById, createPayment };