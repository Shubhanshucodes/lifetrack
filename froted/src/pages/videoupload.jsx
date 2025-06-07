import React, { useState } from 'react';
import axios from 'axios';

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
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading} style={{ marginTop: '10px' }}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {videoUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Uploaded Video:</p>
          <video width="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
