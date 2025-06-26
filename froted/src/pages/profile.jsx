import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [status, setStatus] = useState("Active");
  const [videos, setVideos] = useState([]);
  const [earned, setEarned] = useState(0); // 💰 Earnings default

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchUserDetails();
    trackChallenge();
    fetchUserVideos();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const fetchUserVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/videos", {
        withCredentials: true,
      });
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  const trackChallenge = () => {
    const storedStart = localStorage.getItem("challenge_start");
    const storedLast = localStorage.getItem("last_completed");
    const storedDay = parseInt(localStorage.getItem("current_day")) || 1;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (storedStart && storedLast) {
      if (storedLast === today) {
        setStatus("✅ Completed Today");
      } else if (storedLast === yesterday) {
        setCurrentDay(storedDay);
        setStatus("✅ Active");
      } else {
        resetChallenge("⛔ Missed a day! Restart required.");
        return;
      }

      setStartDate(storedStart);
      setLastCompletedDate(storedLast);
    } else {
      localStorage.setItem("challenge_start", today);
      localStorage.setItem("last_completed", today);
      localStorage.setItem("current_day", "1");
      setStartDate(today);
      setLastCompletedDate(today);
      setCurrentDay(1);
    }
  };

  const resetChallenge = (message = "Challenge restarted.") => {
    const newStart = today;
    localStorage.setItem("challenge_start", newStart);
    localStorage.setItem("last_completed", newStart);
    localStorage.setItem("current_day", "1");
    setStartDate(newStart);
    setLastCompletedDate(newStart);
    setCurrentDay(1);
    setStatus(message);
  };

  const handleFakeSubmit = () => {
    if (lastCompletedDate === today) {
      alert("You’ve already completed today’s tasks!");
      return;
    }

    const nextDay = currentDay + 1;

    if (nextDay > 21) {
      alert("🎉 Challenge Completed! Restarting...");
      resetChallenge("🏁 Completed 21 Days!");
      return;
    }

    localStorage.setItem("last_completed", today);
    localStorage.setItem("current_day", nextDay.toString());
    setLastCompletedDate(today);
    setCurrentDay(nextDay);
    setStatus("✅ Completed Today");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-rose-100 p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* 🔹 User Info Block */}
        {user && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">🙋‍♂️ User Profile</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>👤 Username:</strong> {user.username}</li>
              <li><strong>📧 Email:</strong> {user.email}</li>
              <li>
                <strong>📺 YouTube:</strong>{" "}
                <a href={user.youtube} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  {user.youtube}
                </a>
              </li>
              <li>
                <strong>💳 Payment:</strong>{" "}
                {user.paymentDone ? (
                  <span className="text-green-600 font-semibold">✅ Done</span>
                ) : (
                  <span className="text-red-600 font-semibold">❌ Pending</span>
                )}
              </li>
              <li>
                <strong>💰 Earnings:</strong>{" "}
                <span className="text-emerald-700 font-semibold">₹{earned.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        )}

        {/* 🔹 Challenge Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔥 Your 21-Day Challenge</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>📅 Started On:</strong> {startDate || "Not Started"}</li>
            <li><strong>🕓 Last Completed:</strong> {lastCompletedDate || "N/A"}</li>
            <li><strong>📆 Current Day:</strong> Day {currentDay} of 21</li>
            <li><strong>🚦 Status:</strong> {status}</li>
          </ul>

          <div className="mt-4 space-x-4">
            <button
              onClick={handleFakeSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              ✅ Simulate Task Completion
            </button>
            <button
              onClick={() => resetChallenge("🔄 Manually Restarted")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              🔄 Restart Challenge
            </button>
          </div>
        </div>

        {/* 🔹 Uploaded Videos */}
        {videos.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎥 Your Uploaded Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((url, index) => (
                <video
                  key={index}
                  src={url}
                  controls
                  className="rounded-lg shadow-md w-full h-auto"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
