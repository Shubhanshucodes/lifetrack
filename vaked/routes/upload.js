const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const User = require("../schema/userSchema");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        const user = await User.findById(req.body.userId);
        user.videos.push(result.secure_url);
        await user.save();
        res.status(200).json({ url: result.secure_url });
      }
    );
    result.end(req.file.buffer);
  } catch (err) {
    res.status(400).json({ error: "Upload failed" });
  }
});

router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ videos: user.videos });
});

module.exports = router;
