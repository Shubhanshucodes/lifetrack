import React, { useState } from "react";

const VideoAnalysis = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeVideo = async () => {
    if (!videoUrl.trim()) {
      alert("Please enter a video URL");
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("http://localhost:5000/api/analyze-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error("Error analyzing video:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🎥 Video Communication Analyzer</h1>

      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste video URL here..."
        className="w-full max-w-md px-4 py-2 border rounded shadow-sm mb-4"
      />

      <button
        onClick={analyzeVideo}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Video"}
      </button>

      {feedback && (
        <div className="mt-8 w-full max-w-3xl bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">📊 Feedback</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(feedback, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;
