const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['PENDING', 'SUCCESS', 'FAILED'], 
      default: 'PENDING'
    },
    paymentMethod: { type: String, required: true },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', paymentSchema);