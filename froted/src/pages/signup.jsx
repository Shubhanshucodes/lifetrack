import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate= useNavigate();
  function handler(){
    navigate('/signin')
  }
  const webcamRef = useRef(null);

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
    console.log("orm submitted!")
    if (!captured) {
      alert("Please capture your selfie before submitting.");
      return;
    }

    const payload = new FormData();
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("password", formData.password);

    // Convert base64 to Blob
    const blob = await fetch(selfie).then((res) => res.blob());
    payload.append("selfie", blob, "selfie.jpg");

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      body: payload,
    });

    const result = await res.json();
    console.log(result.message,"comig from here");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Signup with Webcam Selfie</h2>

      <input
        type="text"
        name="username"
        placeholder="Name"
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />

      {!captured ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <br />
          <button onClick={handleCapture}>Capture Selfie</button>
        </div>
      ) : (
        <div>
          <h4>Selfie Captured</h4>
          <img src={selfie} alt="selfie" width="200" />
        </div>
      )}

      <br />
      <button type="button" onClick={handleSubmit}>Signup</button>
      <div> Already have an account? <button onClick={handler}>Signin</button></div>
    </div>
  );
};

export default Signup;
