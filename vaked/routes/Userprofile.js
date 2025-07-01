const verifyUser = require('../middleware/verifyuser');
const formatUserResponse = require('../utils/curr_user')
const express=require('express')
const router=express.Router();
const User=require('../schema/userSchema')


router.get("/me", verifyUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(formatUserResponse(user));
});
router.post("/logout", (req, res) => {
  // Clear the auth cookie
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",  // or "none" if cross-origin with HTTPS
    secure: false     // true if you're using HTTPS
  });

  return res.status(200).json({ message: "Logged out successfully" });
});
module.exports=router;



