import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [startDate, setStartDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [status, setStatus] = useState("Active");
  const [videos, setVideos] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedStart = localStorage.getItem("challenge_start");
    const storedLast = localStorage.getItem("last_completed");
    const storedDay = parseInt(localStorage.getItem("current_day")) || 1;

    if (storedStart && storedLast) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

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

    fetchUserVideos();
  }, []);

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
        {/* Challenge Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 Your 21-Day Challenge</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>📅 Started On:</strong> {startDate || "Not Started"}</li>
            <li><strong>🕓 Last Completed:</strong> {lastCompletedDate || "N/A"}</li>
            <li><strong>🔥 Current Day:</strong> Day {currentDay} of 21</li>
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

        {/* Uploaded Videos */}
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
