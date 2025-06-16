const express = require("express");
const multer = require("multer");
const verifyUser = require("../middleware/verifyuser"); // Add this
const cloudinary=require('../cofig/cloudinary')
const User = require("../schema/userSchema");
const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config


// POST route to upload video

router.post("/upload", verifyUser, upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Video file missing" });
    }

    // ✅ req.user.id is now available from middleware
    const userId = req.user.id;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.videos.push(result.secure_url); // You can also store metadata if needed
    await user.save();

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});


module.exports = router;