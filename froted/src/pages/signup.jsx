import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [selfie, setSelfie] = useState(null);
  const [captured, setCaptured] = useState(false);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const handleCapture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setSelfie(screenshot);
    setCaptured(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!captured) {
      alert("Please capture your selfie before submitting.");
      return;
    }

    const payload = new FormData();
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("password", formData.password);

    const blob = await fetch(selfie).then((res) => res.blob());
    payload.append("selfie", blob, "selfie.jpg");

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      body: payload,
    });

    const result = await res.json();
    console.log(result.message);
    alert("Signup successful!");
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up with Selfie 📸</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={handleChange}
          />
        </div>

        <div className="mt-6 text-center">
          {!captured ? (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="rounded-xl mx-auto border border-gray-300 shadow-md"
              />
              <button
                onClick={handleCapture}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Capture Selfie
              </button>
            </div>
          ) : (
            <div>
              <p className="text-green-600 font-semibold mb-2">✅ Selfie Captured</p>
              <img src={selfie} alt="selfie" className="rounded-xl mx-auto w-40 h-40 object-cover border" />
            </div>
          )}
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
