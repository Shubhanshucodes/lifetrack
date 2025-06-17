const express=require('express')
const router= express.Router()
const Razorpay = require("razorpay")
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Route to create an order
router.post("/create-order", async (req, res) => {
  const options = {
    amount: 2500, // ₹25 = 2500 paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
module.exports= router;