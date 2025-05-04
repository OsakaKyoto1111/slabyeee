const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qrCode: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['ACTIVE', 'USED', 'CANCELLED'], 
    default: 'ACTIVE' 
  },
  purchaseStatus: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED'], 
    default: 'PENDING'
  },
  checkFile: { type: String }, // <-- Файл чека
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);