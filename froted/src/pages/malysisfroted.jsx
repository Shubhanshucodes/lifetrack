import React, { useState } from "react";
import toast from "react-hot-toast"
const api = import.meta.env.VITE_API_URL;

const VideoAnalysis = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeVideo = async () => {
    if (!videoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch(`${api}/api/process/analyze-video`, {
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
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 Video Communication Analyzer</h1>

      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste video URL here..."
        className="w-full max-w-xl px-4 py-2 border rounded shadow-sm mb-4"
      />

      <button
        onClick={analyzeVideo}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Video"}
      </button>

      {feedback && (
        <div className="mt-8 w-full max-w-4xl bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Analysis Summary</h2>

          {/* Transcript */}
          {feedback.transcript && (
            <div>
              <h3 className="font-semibold text-lg mb-1">📝 Transcript</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded border">{feedback.transcript}</p>
            </div>
          )}

          {/* Filler Words / Disfluencies */}
          {Array.isArray(feedback.filler_words) && feedback.filler_words.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-1">⛔ Disfluencies (Filler Words)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {feedback.filler_words.map((item, i) => (
                  <li key={i}>
                    <strong>{item.word}</strong> at {item.start.toFixed(2)}s
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sentiment Analysis */}
          {Array.isArray(feedback.sentiment) && feedback.sentiment.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-1">❤️ Sentiment Analysis</h3>
              <ul className="divide-y divide-gray-200">
                {feedback.sentiment.map((entry, i) => (
                  <li key={i} className="py-2">
                    <strong>{entry.sentiment}</strong> — <em>{entry.text}</em>
                    <span className="ml-2 text-gray-500 text-sm">
                      ({entry.confidence.toFixed(2)} confidence)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Auto Chapters / Keywords */}
          {Array.isArray(feedback.keywords) && feedback.keywords.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-1">📌 Auto Chapters / Keywords</h3>
              <ul className="space-y-2 text-gray-700">
                {feedback.keywords.map((chapter, i) => (
                  <li key={i} className="p-3 border rounded bg-indigo-50">
                    <strong>{chapter.headline}</strong>
                    <div className="text-sm text-gray-600">{chapter.summary}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;
