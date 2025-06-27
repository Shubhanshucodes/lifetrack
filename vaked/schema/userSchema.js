const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  youtube: { type: String, required: true, trim: true },

  videos: [{ type: String }],
  payment: {
  status: {
    type: String,
    enum: ["not_started", "pending", "completed", "failed"],
    default: "not_started",
  },
  paymentId: String,
  orderId: String,
  amount: Number,
  date: Date,
},
// In your User or Challenge model
progress: [
  {
    day: Number, // Day 1 to 21
    date: String, // ISO date string
    manifestation: String,
    contentLink: String,
    completed: Boolean, // true if both done
    submittedAt: Date,
  }
]



}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
