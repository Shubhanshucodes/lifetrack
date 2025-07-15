import React, { useEffect, useState } from "react";
import axios from "axios";
const api = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [earned, setEarned] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${api}/api/me`, {
        withCredentials: true,
      });
      setUser(res.data);

      if (res.data?.progress) {
        const completedDays = res.data.progress.filter((p) => p.completed).length;
        setEarned(completedDays * 5); // ₹5 per successful day
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  if (!user) return <div className="p-6 text-center text-gray-700">🔄 Loading your profile...</div>;

 const getCurrentDay = () => {
  if (user?.payment?.status !== "completed") {
    return { label: "❌ Payment Pending", dayNumber: 0 };
  }

  const payDate = new Date(user.payment.date);
  const challengeStart = new Date(payDate);
  challengeStart.setDate(challengeStart.getDate() + 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - challengeStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "🚧 Starts Tomorrow", dayNumber: 0 };
  if (diffDays >= 21) return { label: "🏁 Completed", dayNumber: 21 };

  return { label: `Day ${diffDays + 1} / 21`, dayNumber: diffDays + 1 };
};




  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mt-4">📺 YouTube</h3>
            <a href={user.youtube} target="_blank" rel="noreferrer" className="text-blue-600 break-all underline text-sm">
              {user.youtube}
            </a>
          </div>

          <div className="text-sm space-y-1">
            <p><strong>💳 Payment:</strong> {user.payment?.status === "completed" ? "✅ Completed" : "❌ Pending"}</p>
            <p><strong>💰 Earnings:</strong> ₹{earned}</p>
          <p><strong>🏁 Current Day:</strong> {getCurrentDay().label}</p>


          </div>
        </aside>

        {/* Main panel */}
        <section className="flex-1 bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">🔥 Challenge Progress</h2>

          {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
  <div
    className={`h-full ${user?.payment?.status === "completed" ? "bg-green-500" : "bg-gray-400"}`}
    style={{
      width: `${(getCurrentDay().dayNumber / 21) * 100}%`,
      transition: "width 0.5s ease-in-out",
    }}
  ></div>
</div>


          {/* Progress Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm border border-gray-200">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Day</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Manifestation</th>
                  <th className="p-3">Content</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.progress?.length > 0 ? (
                  user.progress.map((entry, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3">Day {entry.day}</td>
                      <td className="p-3">{entry.date}</td>
                      <td className="p-3 text-gray-700 truncate max-w-xs">{entry.manifestation}</td>
                      <td className="p-3">
                        <a href={entry.contentLink} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                          View
                        </a>
                      </td>
                      <td className="p-3">
                        {entry.completed ? (
                          <span className="text-green-600 font-medium">✅ Done</span>
                        ) : (
                          <span className="text-red-500 font-medium">❌ Missed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No progress yet. Start your challenge!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
