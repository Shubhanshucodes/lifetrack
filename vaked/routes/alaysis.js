const express = require("express");
const axios = require("axios");
const router = express.Router();
const cors=require('cors')
router.use(cors())

const ASSEMBLY_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// Route: /analyze-video
router.post("/analyze-video", async (req, res) => {
  const { videoUrl } = req.body;

  try {
    // Step 1: Upload video to AssemblyAI
    const uploadRes = await axios({
      method: "post",
      url: "https://api.assemblyai.com/v2/upload",
      headers: {
        Authorization: `Bearer ${ASSEMBLY_API_KEY}`,
      },
      data: videoUrl,
    });

    const audioUrl = uploadRes.data.upload_url;

    // Step 2: Request transcription + analysis
    const transcriptRes = await axios({
      method: "post",
      url: "https://api.assemblyai.com/v2/transcript",
      headers: {
        Authorization: `Bearer ${ASSEMBLY_API_KEY}`,
        "content-type": "application/json",
      },
      data: {
        audio_url: audioUrl,
        auto_chapters: true,
        iab_categories: true,
        sentiment_analysis: true,
        disfluencies: true,
      },
    });

    const transcriptId = transcriptRes.data.id;

    // Step 3: Poll until transcription is done
    let transcriptData = {};
    while (true) {
      const pollingRes = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: { Authorization:  `Bearer ${ASSEMBLY_API_KEY}` },
        }
      );
      transcriptData = pollingRes.data;

      if (transcriptData.status === "completed") break;
      if (transcriptData.status === "error") throw new Error("Transcription failed");

      await new Promise((resolve) => setTimeout(resolve, 3000)); // wait 3 seconds
    }

    // Save or send the result
    res.status(200).json({
      transcript: transcriptData.text,
      filler_words: transcriptData.disfluencies,
      sentiment: transcriptData.sentiment_analysis_results,
      keywords: transcriptData.auto_chapters,
    });
  } catch (error) {
    console.error("Analysis Error:", error.message);
    console.log(error)
    res.status(500).json({ error: "Video analysis failed." });
  }
});

module.exports = router;
