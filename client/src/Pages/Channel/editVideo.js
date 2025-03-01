import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editVideo.css';

const EditVideo = () => {
  const { channelId, videoId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/getVideoById/${videoId}`, { withCredentials: true });
        const video = res.data.video;
        setTitle(video.title);
        setDescription(video.description);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video details:", err);
        setError("Error fetching video details");
        setLoading(false);
      }
    };
    fetchVideoDetails();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/video/${videoId}`, { title, description }, { withCredentials: true });
      navigate(`/watch/${videoId}`);
    } catch (err) {
      console.error("Error updating video:", err);
      setError("Error updating video");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-video-container">
      <h2>Edit Video</h2>
      <form onSubmit={handleSubmit} className="edit-video-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn-submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditVideo;
