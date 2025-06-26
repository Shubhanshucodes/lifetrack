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
module.exports=router;



