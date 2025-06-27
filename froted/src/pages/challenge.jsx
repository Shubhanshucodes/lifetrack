import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [manifestation, setManifestation] = useState("");
  const [submittedManifestation, setSubmittedManifestation] = useState(false);
  const [isTimeWindow, setIsTimeWindow] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [savedLink, setSavedLink] = useState("");
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);

  // ✅ Always get fresh user from backend
  useEffect(() => {
    const fetchFreshUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          credentials: "include",
        });
        const freshUser = await res.json();
        login(freshUser); // ⬅️ Update global context
        if (!freshUser?.payment || freshUser.payment.status !== "completed") {
          toast.error("Please complete payment to access the challenge.");
          navigate("/payment");
        } else {
          setLoading(false);
        }
      } catch (err) {
        toast.error("Error fetching user data.");
        navigate("/signin");
      }
    };

    fetchFreshUser();
  }, [login, navigate]);

  useEffect(() => {
    const savedDay = parseInt(localStorage.getItem("current_day") || "1");
    setCurrentDay(savedDay);

    const savedPrompt = localStorage.getItem("random_message_" + today);
    if (savedPrompt) {
      setRandomMessage(savedPrompt);
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

  const handleManifestationSubmit = async () => {
  const trimmedInput = manifestation.trim().toLowerCase();
  const trimmedPrompt = randomMessage.trim().toLowerCase();

  if (manifestation.trim().length < 20) {
    toast.error("Manifestation should be at least 20 characters long.");
    return;
  }

  if (trimmedInput !== trimmedPrompt) {
    toast.error("Your manifestation must match today's prompt exactly.");
    return;
  }

  try {
    // Save to localStorage
    localStorage.setItem("manifestation_" + today, manifestation);
    setSubmittedManifestation(true);

    // Send to backend
    const res = await fetch("http://localhost:5000/api/challenge/update-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        day: currentDay,
        date: today,
        manifestation,
        contentLink: savedLink || "", // if content already submitted
      }),
    });

    if (res.ok) {
      toast.success("Manifestation submitted and saved!");
    } else {
      toast.error("Failed to save progress.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error submitting manifestation.");
  }
};

  const handleLinkSubmit = async () => {
  const link = contentLink.trim();
  const isValidInstagram = link.includes("instagram.com/reel/");
  const isValidYouTube = link.includes("youtube.com/shorts/") || link.includes("youtu.be/");

  if (!isValidInstagram && !isValidYouTube) {
    toast.error("Please enter a valid YouTube Short or Instagram Reel link.");
    return;
  }

  try {
    // Save locally
    localStorage.setItem("content_link_" + today, link);
    setContentSubmitted(true);
    setSavedLink(link);

    // Send to backend
    const res = await fetch("http://localhost:5000/api/challenge/update-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        day: currentDay,
        date: today,
        manifestation: manifestation || "", // if already typed
        contentLink: link,
      }),
    });

    if (res.ok) {
      toast.success("Link submitted and saved!");
    } else {
      toast.error("Failed to save link.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error submitting link.");
  }
};

  if (loading) return <div className="text-center mt-10">🔄 Loading challenge...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-rose-100 to-teal-100 p-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center text-xl font-semibold text-gray-800">
          🔥 You're on <span className="text-teal-700">Day {currentDay}</span> of 21!
        </div>

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
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Pasting is disabled. Type it mindfully.");
                }}
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
