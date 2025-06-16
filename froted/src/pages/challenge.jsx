import React, { useState, useEffect } from "react";
import "../CssFiles/challenge.css"; // Make sure this matches your file name

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
    <div className="tasks-container">
      {/* Manifestation Task */}
      <div className="task-block">
        <h2>🌅 Daily Manifestation</h2>
        <p>Write your personal manifestation based on the prompt below. Only between 5:00–5:05 AM IST.</p>

        <div className="manifestation-prompt">
          <p><strong>📝 Today's Prompt:</strong></p>
          <p>{randomMessage}</p>
        </div>

        {submittedManifestation ? (
          <div className="success-box">
            ✅ Submitted: <em>{manifestation}</em>
          </div>
        ) : isTimeWindow ? (
          <div>
            <textarea
              placeholder="Type your manifestation here..."
              value={manifestation}
              onChange={(e) => setManifestation(e.target.value)}
            />
            <button onClick={handleManifestationSubmit}>
              Submit Manifestation
            </button>
          </div>
        ) : (
          <div className="error-box">⛔ You can only submit between 5:00–5:05 AM IST.</div>
        )}
      </div>

      {/* Content Link Task */}
      <div className="task-block">
        <h2>📢 Content Consistency</h2>
        <p>Post a reel or YouTube short and paste the link here.</p>

        {contentSubmitted ? (
          <div className="success-box">
            ✅ Submitted: <a href={savedLink} target="_blank" rel="noreferrer">{savedLink}</a>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Paste your Instagram Reel or YouTube Short link..."
              value={contentLink}
              onChange={(e) => setContentLink(e.target.value)}
            />
            <button onClick={handleLinkSubmit}>
              Submit Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengePage;
