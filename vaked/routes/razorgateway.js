const express=require('express')
const Razorpay = require("razorpay")
const razorpay = new Razorpay({
  key_id: "rzp_test_cMwlNl5xr2YqvT",
  key_secret: "YOUR_KEY_SECRET", // keep this in .env, don't share publicly
});

// Route to create an order
app.post("/create-order", async (req, res) => {
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