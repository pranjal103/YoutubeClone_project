import React, { useState, useEffect } from 'react';
import './channel.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewChannel = ({ sideNavbar }) => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const loggedInUser = localStorage.getItem("userId");
  const isOwner = channel && channel.owner.toString() === loggedInUser;

  const fetchChannelData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/channel/${channelId}`,
        { withCredentials: true }
      );
      setChannel(response.data.channel);
      setVideos(response.data.videos || []);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    if (channelId) {
      fetchChannelData();
    }
  }, [channelId, refresh]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateChannelField = async (field, value) => {
    try {
      await axios.put(
        `http://localhost:4000/api/channel/${channelId}`,
        { [field]: value },
        { withCredentials: true }
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(`Error updating channel ${field}:`, error);
    }
  };

  const handleImageChange = async (e, field) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'youtube-clone');
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dldpmvy2l/image/upload",
        data
      );
      const imageUrl = response.data.url;
      updateChannelField(field, imageUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBannerClick = () => {
    if (isOwner && window.confirm("Do you want to change your channel banner?")) {
      document.getElementById("bannerInput").click();
    }
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    if (isOwner && window.confirm("Do you want to change your channel avatar?")) {
      document.getElementById("avatarInput").click();
    }
  };

  const handleDeleteChannel = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this channel? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      await axios.delete(`http://localhost:4000/api/channel/${channelId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return (
    <div className='profile'>
      <SideNavbar sideNavbar={sideNavbar} />
      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        <input
          type="file"
          id="bannerInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => handleImageChange(e, "channelBanner")}
        />
        <input
          type="file"
          id="avatarInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => handleImageChange(e, "avatar")}
        />

        <div
          className="profile_top_section"
          style={{
            backgroundImage: channel?.channelBanner
              ? `url(${channel.channelBanner})`
              : 'none',
          }}
          onClick={handleBannerClick}
          title={isOwner ? "Click to change banner" : ""}
        >
          <div className="profile_top_section_overlay">
            <div className="profile_top_section_profile">
              <img
                className='profile_top_section_img'
                src={channel?.avatar}
                alt="Channel Avatar"
                onClick={handleAvatarClick}
                title={isOwner ? "Click to change avatar" : ""}
              />
            </div>
            <div className="profile_top_section_About">
              <div className="profile_top_section_About_Name">
                {channel?.channelName}
              </div>
              <div className="profile_top_section_info">
                Total - {videos.length} Videos
              </div>
              <div className="profile_top_section_info">
                {channel?.description}
              </div>
            </div>
          </div>
        </div>

        <div className="profile_videos">
        <div className="profile_videos_title">
          <div className="video_section">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          {isOwner && (
            <div className="channel_actions">
              <div className="delete_channel">
                <button onClick={handleDeleteChannel}>Delete Channel</button>
              </div>
              <div className="upload_channel_video">
                <Link
                  to={`/user/${loggedInUser}/channel/${channelId}/upload`}
                  className="uploadBtn-form"
                >
                  Upload Video
                </Link>
              </div>
            </div>
          )}
        </div>

          <div className="profileVideos">
            {videos.map((video) => (
              <div key={video._id} className="profileVideo_container">
                <Link to={`/watch/${video._id}`} className="profileVideo_block">
                  <div className="profileVideo_block_thumbnail">
                    <img
                      src={video?.thumbnail}
                      alt={video?.title}
                      className="profileVideo_block_thumbnail_img"
                    />
                  </div>
                  <div className="profileVideo_block_detail">
                    <div className="profileVideo_block_detail_name">
                      {video?.title}
                    </div>
                    <div className="profileVideo_block_detail_about">
                      Created on {video?.createdAt.slice(0, 10)}
                    </div>
                  </div>
                </Link>
                {isOwner && (
                  <div className="edit_video_option">
                    <Link to={`/user/${loggedInUser}/channel/${channelId}/edit-video/${video._id}`}>
                      Edit Video
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewChannel;
