const express = require("express");
const crypto = require("crypto");
const User = require("../schema/userSchema"); // your Mongoose model
const router = express.Router();

router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId, // sent from frontend
  } = req.body;

  // Verify signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  // Update user’s payment status
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.payment = {
      status: "completed",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: 25,
      date: new Date(),
    };

    await user.save();

    return res.status(200).json({ success: true, message: "Payment verified and saved" });
  } catch (err) {
    console.error("DB update error", err);
    return res.status(500).json({ success: false, message: "DB error" });
  }
});
module.exports= router;