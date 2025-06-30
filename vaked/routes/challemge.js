const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema");
const authMiddleware = require("../middleware/verifyuser"); // <-- assuming you have authMiddleware
const axios = require("axios");


function extractVideoId(link) {
  const shortsMatch = link.match(/shorts\/([^?]+)/);
  const youtuBeMatch = link.match(/youtu\.be\/([^?]+)/);
  return shortsMatch?.[1] || youtuBeMatch?.[1] || null;
}

async function getVideoChannelId(videoId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  const res = await axios.get(url);
  return res.data.items?.[0]?.snippet?.channelId;
}

router.post("/update-progress", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { day, date, manifestation, contentLink } = req.body;

    if (!userId || !day || !date || !contentLink) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Verify YouTube ownership
    const videoId = extractVideoId(contentLink);
    if (!videoId) return res.status(400).json({ error: "Invalid YouTube link." });

    const videoChannelId = await getVideoChannelId(videoId, process.env.YOUTUBE_API_KEY);
    const userChannelId = user.youtube.split("/channel/")[1];

    if (!videoChannelId || videoChannelId !== userChannelId) {
      return res.status(403).json({ error: "Video does not belong to your channel." });
    }

    // ✅ Store progress (same as before)
    const existingDay = user.progress.find((entry) => entry.day === day);
    if (existingDay) {
      if (manifestation) existingDay.manifestation = manifestation;
      if (contentLink) existingDay.contentLink = contentLink;
      existingDay.date = date;
      existingDay.submittedAt = new Date();
      existingDay.completed = true;
    } else {
      user.progress.push({
        day,
        date,
        manifestation,
        contentLink,
        submittedAt: new Date(),
        completed: true,
      });
    }

    await user.save();
    return res.json({ message: "Progress saved successfully", progress: user.progress });

  } catch (err) {
    console.error("Progress update error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/reset-progress", async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      $set: {
        progress: [],
        "payment.status": "not_started" // optional: or reset it if you want to charge again
      }
    });

    res.json({ message: "Progress reset" });
  } catch (err) {
    console.error("Reset failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;