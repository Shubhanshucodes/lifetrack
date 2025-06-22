import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import toast from "react-hot-toast";

const Signup = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    youtube: "",
   
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
    toast.success("Selfie captured successfully!");
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { username, email, password, youtube } = formData;

    if (!captured) {
      toast.error("Please capture your selfie before submitting.");
      return;
    }

    if (!youtube) {
      toast.error("Please provide profile link: YouTube");
      return;
    }

    const payload = new FormData();
    payload.append("username", username);
    payload.append("email", email);
    payload.append("password", password);
    payload.append("youtube", youtube);
    

    const blob = await fetch(selfie).then((res) => res.blob());
    payload.append("selfie", blob, "selfie.jpg");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: payload,
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
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up with Selfie 📸</h2>

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
          <input
            type="url"
            name="youtube"
            placeholder="YouTube Channel Link"
            className="w-full px-4 py-2 border rounded-xl"
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
                className="rounded-xl mx-auto border"
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
