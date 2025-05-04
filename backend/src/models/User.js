const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  avatar: { type: String },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['USER', 'HEAD', 'ADMIN'], 
    default: 'USER' 
  },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);