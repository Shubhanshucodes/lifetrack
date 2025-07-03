import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';

const manifestationTemplates = [
  "Today is {date}. I am alive, I am blessed, and I welcome all good things.",
  "Today is {date}. I radiate calm, confidence, and clarity.",
  "Today is {date}. I deserve love, success, and joy, and I claim it fully.",
  "Today is {date}. I am open to miracles and grounded in gratitude.",
  "Today is {date}. I choose peace, I choose purpose, and I choose progress.",
  "Today is {date}. Every moment today is an opportunity to rise and shine.",
  "Today is {date}. I am exactly where I need to be, doing what I need to do.",
  "Today is {date}. I will move forward with love, courage, and belief in myself.",
];

const getISTTime = () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

const ChallengePage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  console.log(today)

  const [manifestation, setManifestation] = useState("");
  const [submittedManifestation, setSubmittedManifestation] = useState(false);
  const [isTimeWindow, setIsTimeWindow] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");
  const [contentLink, setContentLink] = useState("");
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [savedLink, setSavedLink] = useState("");
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasCheckedPayment, setHasCheckedPayment] = useState(false);


  // Fetch latest user
  useEffect(() => {
    if (hasCheckedPayment) return;
    const fetchFreshUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/me", {
          withCredentials: true, // ✅ axios uses `withCredentials`, not `credentials`
        });
        const freshUser = res.data; // ✅ axios response

        console.log(freshUser, "hi");
        // login(freshUser);

        if (!freshUser?.payment || freshUser.payment.status !== "completed") {
          toast.error("Please complete payment to access the challenge.");
          navigate("/payment");
        } else {
          setLoading(false);
        }
         setHasCheckedPayment(true);
      } catch (err) {
        toast.error("Error fetching user data.");
        navigate("/signin");
      }
    };

    fetchFreshUser();
  }, [login, navigate,hasCheckedPayment]);


  // Load localStorage + current day
  useEffect(() => {
    const savedPrompt = localStorage.getItem("random_message_" + today);
    console.log(savedPrompt)
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

    if (user?.payment?.date) {
      const startDate = new Date(user.payment.date);
      const todayDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      todayDate.setHours(0, 0, 0, 0);
      const diff = Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24));
      setCurrentDay(diff + 1);
    }
  }, [user]);

  // Time Window Checker (5:00–5:04 AM IST)
  useEffect(() => {
    const checkTimeWindow = () => {
      const IST = getISTTime();
      const h = IST.getHours();
      const m = IST.getMinutes();
      setIsTimeWindow(h === 5 && m >= 0 && m <= 4);
    };
    checkTimeWindow();
    const interval = setInterval(checkTimeWindow, 15000);
    return () => clearInterval(interval);
  }, []);

  // Reset Logic at 8:47 PM IST
  useEffect(() => {
    const resetInterval = setInterval(() => {
      const IST = getISTTime();
      const h = IST.getHours();
      const m = IST.getMinutes();

      const manifest = localStorage.getItem("manifestation_" + today);
      const content = localStorage.getItem("content_link_" + today);
      console.log(manifest, content)
      const resetKey = "hasReset_" + today;

      if (h === 22 && m === 35 && (!manifest?.trim() || !content?.trim()) && !localStorage.getItem(resetKey)) {
        localStorage.setItem(resetKey, "true");

        axios.post("http://localhost:5000/api/challenge/reset-progress", {}, {
          withCredentials: true,
        })
          .then((res) => {
            const data = res.data;
            toast.error("Progress reset due to missed submission before 8:47 PM IST.");
            localStorage.removeItem("manifestation_" + today);
            localStorage.removeItem("content_link_" + today);
            localStorage.removeItem("random_message_" + today);
            setSubmittedManifestation(false);
            setContentSubmitted(false);
            setTimeout(() => navigate("/payment"), 1000);
          })
          .catch((err) => {
            console.error("❌ Reset error:", err);
          });
      }

      if (h === 22 && m === 36) {
        localStorage.removeItem(resetKey);
      }
    }, 15000);
    return () => clearInterval(resetInterval);
  }, [navigate, today]);

  // Submit Manifestation
  const handleManifestationSubmit = async () => {
    if (manifestation.trim().length < 20) {
      toast.error("Manifestation must be at least 20 characters.");
      return;
    }

    if (manifestation.trim().toLowerCase() !== randomMessage.trim().toLowerCase()) {
      toast.error("Manifestation must match today's prompt exactly.");
      return;
    }

    try {
      localStorage.setItem("manifestation_" + today, manifestation);
      setSubmittedManifestation(true);

      const res = await fetch("http://localhost:5000/api/challenge/update-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          day: currentDay,
          date: today,
          manifestation,
          contentLink: savedLink || "",
        }),
      });

      if (res.ok) toast.success("Manifestation submitted!");
      else toast.error((await res.json()).error || "Submission failed.");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting manifestation.");
    }
  };

  // Submit Link
  const handleLinkSubmit = async () => {
    const link = contentLink.trim();
    const isValid = link.includes("youtube.com/shorts/") || link.includes("youtu.be/");

    if (!isValid) {
      toast.error("Please enter a valid YouTube Shorts link.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/challenge/update-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          day: currentDay,
          date: today,
          manifestation: manifestation || "",
          contentLink: link,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("content_link_" + today, link);
        setContentSubmitted(true);
        setSavedLink(link);
        toast.success("Link submitted!");
      } else {
        toast.error(result.error || "Submission failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting link.");
    }
  };

  if (loading) return <div className="text-center mt-10">🔄 Loading challenge...</div>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-rose-100 to-teal-100">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center text-xl font-semibold">
          🔥 You're on <span className="text-teal-700">Day {currentDay}</span> of 21!
        </div>

        {/* Manifestation Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">🌅 Daily Manifestation</h2>
          <div className="bg-yellow-100 p-4 rounded mb-4">
            <strong>Prompt:</strong> <em>{randomMessage}</em>
          </div>

          {submittedManifestation ? (
            <div className="text-green-700 font-medium bg-green-50 p-3 rounded">
              ✅ Submitted: <em>{manifestation}</em>
            </div>
          ) : isTimeWindow ? (
            <div className="space-y-3">
              <textarea
                rows={4}
                className="w-full p-3 border rounded-md"
                value={manifestation}
                onChange={(e) => setManifestation(e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Pasting is disabled. Type mindfully.");
                }}
              />
              <button
                onClick={handleManifestationSubmit}
                className="bg-teal-600 text-white px-4 py-2 rounded-md"
              >
                Submit Manifestation
              </button>
            </div>
          ) : (
            <div className="text-red-700 bg-red-50 p-3 rounded">
              ⛔ You can only submit between 5:00–5:04 AM IST.
            </div>
          )}
        </div>

        {/* Content Link Section */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">📢 Content Consistency</h2>

          {contentSubmitted ? (
            <div className="text-green-700 bg-green-50 p-3 rounded">
              ✅ Submitted:{" "}
              <a
                href={savedLink}
                className="underline text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                {savedLink}
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Paste YouTube Short link..."
                value={contentLink}
                onChange={(e) => setContentLink(e.target.value)}
              />
              <button
                onClick={handleLinkSubmit}
                className="bg-rose-600 text-white px-4 py-2 rounded-md"
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
