
const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Venue', venueSchema);