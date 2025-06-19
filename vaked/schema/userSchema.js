const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },

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


}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
