import React, { useState } from 'react';
import axios from 'axios';
import VideoAnalysis from './malysisfroted';

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) return alert("Please select a video first.");

    const formData = new FormData();
    formData.append("video", video);

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setVideoUrl(res.data.url);
      alert('✅ Upload successful!');
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      alert('❌ Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-amber-50 to-lime-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🎥 Daily Reflection Upload</h2>
        <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
          This is your safe space to reflect or plan your day. Upload a short video of your thoughts, progress, or goals.
          No filters, just honesty. One step a day builds the path forward.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-500"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-2 rounded-xl font-semibold text-white transition ${
              uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-lime-600 hover:bg-lime-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>

        {videoUrl && (
          <div className="mt-6">
            <p className="text-green-600 text-sm mb-2">Uploaded Successfully! 🎉</p>
            <video src={videoUrl} controls className="w-full rounded-xl shadow" />
          </div>
        )}

        <div className="mt-8">
          <VideoAnalysis />
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
