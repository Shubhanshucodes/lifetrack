import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CssFiles/challenge.css";

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

    // Fetch videos from backend
    fetchUserVideos();
  }, []);

  const fetchUserVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/videos", {
        withCredentials: true, // Include cookies/token if needed
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
    <div className="tasks-container">
      <div className="task-block">
        <h2>👤 Your 21-Day Challenge</h2>
        <p><strong>Started On:</strong> {startDate || "Not Started"}</p>
        <p><strong>Last Completed:</strong> {lastCompletedDate || "N/A"}</p>
        <p><strong>Current Day:</strong> Day {currentDay} of 21</p>
        <p><strong>Status:</strong> {status}</p>
        <button onClick={handleFakeSubmit}>✅ Simulate Task Completion</button>
        <button style={{ backgroundColor: "#dc2626" }} onClick={() => resetChallenge("🔄 Manually Restarted")}>🔄 Restart Challenge</button>
      </div>

      {videos.length >= 0 && (
        <div className="task-block">
          <h1>🎥 Your Uploaded Videos</h1>
          <div className="video-grid">
            {videos.map((url, index) => (
              <video key={index} src={url} controls className="video-item" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
