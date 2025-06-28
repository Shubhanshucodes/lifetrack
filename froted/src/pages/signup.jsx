import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    youtube: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
  const { username, email, password, youtube } = formData;

  if (!youtube || !youtube.includes("/channel/UC")) {
    toast.error("Please enter a valid YouTube channel link (must contain /channel/UC...)");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ Important!
      },
      credentials: "include", // ✅ if you use cookies
      body: JSON.stringify({ username, email, password, youtube }),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => navigate("/signin"), 1500);
    } else {
      toast.error(result.message || "Signup failed. Try again.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up 🎯</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-xl"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-xl"
            onChange={handleChange}
          />
          <div>
            <input
              type="url"
              name="youtube"
              placeholder="YouTube Channel Link (must include /channel/UC...)"
              className="w-full px-4 py-2 border rounded-xl"
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              🔗 Go to your channel, click on your profile, and copy the full link from the address bar. Example:
              <br />
              <code className="text-blue-600 break-all">
                https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxx
              </code>
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition"
        >
          Submit & Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
