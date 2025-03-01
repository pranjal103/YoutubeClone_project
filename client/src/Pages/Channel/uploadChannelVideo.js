import React, { useState, useEffect } from 'react';
import './uploadChannelVideo.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';

const UploadChannelVideo = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
    channel: channelId
  });
  const [loader, setLoader] = useState(false);

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value
    });
  };

  const uploadFileToCloudinary = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');
    const endpoint =
      type === "video"
        ? "https://api.cloudinary.com/v1_1/dldpmvy2l/video/upload"
        : "https://api.cloudinary.com/v1_1/dldpmvy2l/image/upload";
    try {
      const response = await axios.post(endpoint, data);
      setLoader(false);
      return response.data.secure_url;
    } catch (err) {
      setLoader(false);
      toast.error("Upload failed");
      throw err;
    }
  };

  const handleVideoFileChange = (e) => {
    setInputField({ ...inputField, videoLink: "" });
    setLoader(true);
    uploadFileToCloudinary(e, "video")
      .then((url) => {
        setInputField((prev) => ({ ...prev, videoLink: url }));
      })
      .catch(() => {
        toast.error("Video upload failed");
      });
  };

  const handleThumbnailFileChange = (e) => {
    setInputField({ ...inputField, thumbnail: "" });
    setLoader(true);
    uploadFileToCloudinary(e, "image")
      .then((url) => {
        setInputField((prev) => ({ ...prev, thumbnail: url }));
      })
      .catch(() => {
        toast.error("Thumbnail upload failed");
      });
  };

  const handleSubmitFunc = async (event) => {
    event.preventDefault();
    if (!inputField.videoLink) {
      toast.error("Please upload a video before submitting.");
      return;
    }
    setLoader(true);
    try {
      await axios.post(
        "http://localhost:4000/api/video/upload",
        inputField,
        { withCredentials: true }
      );
      setLoader(false);
      toast.success("Video uploaded successfully!");
      navigate(`/channel/${channelId}`);
    } catch (err) {
      setLoader(false);
      toast.error("Video upload failed");
    }
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (!isLogin) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="uploadChannelVideo">
      <div className="uploadChannelVideo_card">
        <div className="backButtonContainer">
          <button 
            className="backButton"
            onClick={() => navigate(`/channel/${channelId}`)}
          >
            Back to Channel
          </button>
        </div>
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video for Channel
        </div>
        <div className="uploadForm">
          <input
            type="text"
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, "title")}
            placeholder="Title of Video"
          />
          <input
            type="text"
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, "description")}
            placeholder="Description"
          />
          <input
            type="text"
            value={inputField.videoType}
            onChange={(e) => handleOnChangeInput(e, "videoType")}
            placeholder="Category"
          />
          <div>
            <label>Thumbnail:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleThumbnailFileChange} 
            />
          </div>
          <div>
            <label>Video:</label>
            <input 
              type="file" 
              accept="video/mp4, video/webm, video/*" 
              onChange={handleVideoFileChange} 
            />
          </div>
          {loader && (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          )}
        </div>
        <div className="uploadBtns">
          <button 
            className="uploadBtn-form" 
            onClick={handleSubmitFunc} 
            disabled={loader}
          >
            {loader ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadChannelVideo;
