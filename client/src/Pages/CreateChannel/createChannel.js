import React, { useState, useEffect } from 'react';
import './createChannel.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const CreateChannel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [channelData, setChannelData] = useState({
    channelName: "",
    description: "",
    channelBanner: "https://placehold.co/300x100?text=Channel+Banner",
    avatar: "https://placehold.co/150?text=Avatar"
  });
  const [uploadedBannerUrl, setUploadedBannerUrl] = useState("https://placehold.co/300x100?text=Channel+Banner");
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState("https://placehold.co/150?text=Avatar");
  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, name) => {
    setChannelData({
      ...channelData,
      [name]: e.target.value
    });
  };

  const uploadBanner = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');
    try {
      setProgressBar(true);
      const response = await axios.post("https://api.cloudinary.com/v1_1/dldpmvy2l/image/upload", data);
      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedBannerUrl(imageUrl);
      setChannelData({
        ...channelData,
        channelBanner: imageUrl
      });
    } catch (err) {
      console.log(err);
      setProgressBar(false);
    }
  };

  const uploadAvatar = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');
    try {
      setProgressBar(true);
      const response = await axios.post("https://api.cloudinary.com/v1_1/dldpmvy2l/image/upload", data);
      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedAvatarUrl(imageUrl);
      setChannelData({
        ...channelData,
        avatar: imageUrl
      });
    } catch (err) {
      console.log(err);
      setProgressBar(false);
    }
  };

  const handleCreateChannel = async () => {
    setProgressBar(true);
    const owner = localStorage.getItem("userId");
    const payload = {
      ...channelData,
      owner,
      subscribers: 0,
      videos: []
    };

    axios.post("http://localhost:4000/api/channel", payload, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message || "Channel created successfully");
        setProgressBar(false);
        navigate('/');
      })
      .catch(err => {
        setProgressBar(false);
        toast.error(err.response?.data?.error || "Channel creation failed");
      });
  };

  return (
    <div className="createChannel">
      <div className="createChannel_card">
        <div className="createChannel_title">
          <YouTubeIcon sx={{ fontSize: "54px" }} className="createChannel_icon" />
          Create Channel
        </div>
        <div className="createChannel_Inputs">
          <input 
            type="text" 
            className="createChannel_Inputs_inp" 
            value={channelData.channelName} 
            onChange={(e) => handleInputChange(e, "channelName")} 
            placeholder="Channel Name" 
          />
          <input 
            type="text" 
            className="createChannel_Inputs_inp" 
            value={channelData.description} 
            onChange={(e) => handleInputChange(e, "description")} 
            placeholder="Channel Description" 
          />
          <div className="image_upload_channel">
            <label>Channel Banner:</label>
            <input type="file" onChange={uploadBanner} />
            <div className="image_upload_channel_div">
              <img className="image_default_channel" src={uploadedBannerUrl} alt="Channel Banner" />
            </div>
          </div>
          <div className="image_upload_channel">
            <label>Channel Avatar:</label>
            <input type="file" onChange={uploadAvatar} />
            <div className="image_upload_channel_div">
              <img className="image_default_channel" src={uploadedAvatarUrl} alt="Channel Avatar" />
            </div>
          </div>
          <div className="createChannelBtns">
            <div className="createChannelBtn" onClick={handleCreateChannel}>Create Channel</div>
            <Link to="/" className="createChannelBtn">Home Page</Link>
          </div>
          {progressBar && 
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateChannel;
