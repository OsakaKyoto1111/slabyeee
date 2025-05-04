const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },    
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}

  }, { timestamps: true });
  
  module.exports = mongoose.model('Club', clubSchema);