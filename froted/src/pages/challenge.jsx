import React, { useState, useEffect } from "react";

const manifestationTemplates = [
  "Today is {date}. I am alive, I am blessed, and I welcome all good things.",
  "Today is {date}. I radiate calm, confidence, and clarity.",
  "Today is {date}. I deserve love, success, and joy, and I claim it fully.",
  "Today is {date}. I am open to miracles and grounded in gratitude.",
  "Today is {date}. I choose peace, I choose purpose, and I choose progress.",
  "Today is {date}. Every moment today is an opportunity to rise and shine.",
  "Today is {date}. I am exactly where I need to be, doing what I need to do.",
  "Today is {date}. I will move forward with love, courage, and belief in myself."
];

const ChallengePage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [manifestation, setManifestation] = useState("");
  const [submittedManifestation, setSubmittedManifestation] = useState(false);
  const [isTimeWindow, setIsTimeWindow] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [savedLink, setSavedLink] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("random_message_" + today);
    if (saved) {
      setRandomMessage(saved);
    } else {
      const random = manifestationTemplates[Math.floor(Math.random() * manifestationTemplates.length)];
      const filled = random.replace("{date}", today);
      localStorage.setItem("random_message_" + today, filled);
      setRandomMessage(filled);
    }

    const savedManifestation = localStorage.getItem("manifestation_" + today);
    if (savedManifestation) {
      setSubmittedManifestation(true);
      setManifestation(savedManifestation);
    }

    const savedContent = localStorage.getItem("content_link_" + today);
    if (savedContent) {
      setContentSubmitted(true);
      setSavedLink(savedContent);
    }

    const checkTimeWindow = () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(now.getTime() + istOffset - now.getTimezoneOffset() * 60000);

      const hours = istTime.getUTCHours();
      const minutes = istTime.getUTCMinutes();

      setIsTimeWindow(hours === 5 && minutes >= 0 && minutes <= 5);
    };

    checkTimeWindow();
    const interval = setInterval(checkTimeWindow, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleManifestationSubmit = () => {
    if (manifestation.trim().length < 20) {
      alert("Manifestation should be at least 20 characters long.");
      return;
    }

    const positiveWords = ["grateful", "abundant", "happy", "peace", "love", "health", "wealth", "growth", "achieve", "manifest"];
    const isPositive = positiveWords.some(word => manifestation.toLowerCase().includes(word));

    if (!isPositive) {
      alert("Try to write a more positive and meaningful manifestation.");
      return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const yesterdayMsg = localStorage.getItem("manifestation_" + yesterday);

    if (manifestation.trim() === yesterdayMsg?.trim()) {
      alert("Write a different message than yesterday.");
      return;
    }

    localStorage.setItem("manifestation_" + today, manifestation);
    setSubmittedManifestation(true);
  };

  const handleLinkSubmit = () => {
    const link = contentLink.trim();
    const isValidInstagram = link.includes("instagram.com/reel/");
    const isValidYouTube = link.includes("youtube.com/shorts/") || link.includes("youtu.be/");

    if (!isValidInstagram && !isValidYouTube) {
      alert("❌ Please enter a valid Instagram Reel or YouTube Short link.");
      return;
    }

    localStorage.setItem("content_link_" + today, link);
    setContentSubmitted(true);
    setSavedLink(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-rose-100 to-teal-100 p-6">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Manifestation Block */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">🌅 Daily Manifestation</h2>
          <p className="text-sm text-gray-600 mb-4">Write your personal manifestation between <strong>5:00–5:05 AM IST</strong>.</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
            <p className="text-gray-700"><strong>📝 Today's Prompt:</strong></p>
            <p className="italic">{randomMessage}</p>
          </div>

          {submittedManifestation ? (
            <div className="text-green-700 font-medium bg-green-50 border border-green-200 rounded p-3">
              ✅ Submitted: <em>{manifestation}</em>
            </div>
          ) : isTimeWindow ? (
            <div className="space-y-3">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                rows="4"
                placeholder="Type your manifestation..."
                value={manifestation}
                onChange={(e) => setManifestation(e.target.value)}
              />
              <button
                onClick={handleManifestationSubmit}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg"
              >
                Submit Manifestation
              </button>
            </div>
          ) : (
            <div className="text-red-700 bg-red-50 border border-red-200 rounded p-3">
              ⛔ You can only submit between <strong>5:00–5:05 AM IST</strong>.
            </div>
          )}
        </div>

        {/* Content Link Block */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">📢 Content Consistency</h2>
          <p className="text-sm text-gray-600 mb-4">Post a reel or YouTube short and paste the link here.</p>

          {contentSubmitted ? (
            <div className="text-green-700 font-medium bg-green-50 border border-green-200 rounded p-3">
              ✅ Submitted: <a href={savedLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">{savedLink}</a>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
                placeholder="Paste your Instagram Reel or YouTube Short link..."
                value={contentLink}
                onChange={(e) => setContentLink(e.target.value)}
              />
              <button
                onClick={handleLinkSubmit}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg"
              >
                Submit Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
