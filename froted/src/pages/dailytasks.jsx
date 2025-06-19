import React, { useState } from 'react';
import axios from 'axios';
import '../CssFiles/videoupload.css'
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
         withCredentials: true,
      });
      setVideoUrl(res.data.url);
      alert('uploaded');
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      alert('Upload failed');
      
      console.log(error)
    } finally {
      setUploading(false);
      
    } 
  };

  return (
    
    <div style={{ padding: '20px', maxWidth: '400px' }}>
       <p>
                Welcome! This is your daily space to reflect and plan. Just record or upload a short video of yourself 
                sharing how your day went or what your plans are for today. It doesn’t have to be perfect—just be real. 
                Click the “Upload” button to get started and make this a daily habit. Your journey, one day at a time.
            </p>
      <h2>Upload Video</h2>
      <div className="upload-container">
  <input type="file" accept="video/*" onChange={handleFileChange} className="file-input" />
  <button onClick={handleUpload} disabled={uploading} className="upload-button">
    {uploading ? 'Uploading...' : 'Upload'}
  </button>

 

</div>
<VideoAnalysis/>
</div>
  )}
  export default VideoUpload;

