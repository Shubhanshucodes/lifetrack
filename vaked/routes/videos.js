const express=require('express')
const User=require('../schema/userSchema')
const verifyUser = require("../middleware/verifyuser");
const router= express.Router()
router.get("/videos", verifyUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ videos: user.videos });
});
module.exports= router;
