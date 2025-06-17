const express = require("express");
const multer = require("multer");
const verifyUser = require("../middleware/verifyuser");
const Cloudinary = require("../cofig/cloudinary");
const streamifier = require("streamifier");
const User = require("../schema/userSchema");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", verifyUser, upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Video file missing" });
    }

    const userId = req.user.id;

    const result = await new Promise((resolve, reject) => {
      const stream = Cloudinary.uploader.upload_stream(
        { resource_type: "video" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.videos.push(result.secure_url);
    await user.save();

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
    console.log(err)
  }
});

module.exports = router;
// fix the signup page to have signin option also and once users signsin 
// thier should not ve signin options and should ve a profile showing users. 
// Fix the upload api error. analysis part should ve fixed and should ve shown in the right side of the page
// fix profile, should ve updated properly and there should ve users videos also