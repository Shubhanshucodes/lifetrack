const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema");

// POST /api/challenge/update-progress
router.post("/update-progress", async (req, res) => {
  try {
    const { userId, day, date, manifestation, contentLink } = req.body;

    if (!userId || !day || !date) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if progress for the day already exists
    const existingDay = user.progress.find((entry) => entry.day === day);

    if (existingDay) {
      // ✅ Update fields if not already submitted
      if (manifestation) existingDay.manifestation = manifestation;
      if (contentLink) existingDay.contentLink = contentLink;
      existingDay.date = date;
      existingDay.submittedAt = new Date();
    } else {
      // ➕ Add new entry
      user.progress.push({
        day,
        date,
        manifestation,
        contentLink,
        submittedAt: new Date(),
      });
    }

    await user.save();

    res.json({ message: "Progress saved successfully", progress: user.progress });
  } catch (err) {
    console.error("Progress update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
