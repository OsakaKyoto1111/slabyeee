const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateTime: { type: Date, required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  totalTickets: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
  isFree: { type: Boolean, default: false },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  bankNumber: { type: String },
  images: [{ type: String }] 
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);