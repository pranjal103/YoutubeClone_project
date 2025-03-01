// App.js
// Main entry point for the YouTube Clone application.
// This component sets up the primary layout and routing for the application using react-router-dom.

import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Channel from './Pages/Channel/channel';
import ViewChannel from './Pages/Channel/viewChannel';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import UploadChannelVideo from './Pages/Channel/uploadChannelVideo';
import SignUp from './Pages/SignUp/signUp';
import CreateChannel from './Pages/CreateChannel/createChannel';
import EditVideo from './Pages/Channel/editVideo';
import axios from 'axios';

function App() {
  // State to control the visibility of the side navigation bar
  const [sideNavbar, setSideNavbar] = useState(true);
  // State to store the current search term from the Navbar component
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all videos on initial render.
  // This can be used for debugging, initialization, or caching purposes.
  useEffect(() => {
    axios.get('http://localhost:4000/api/allVideo')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  // Function to update the sideNavbar state based on user interaction
  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  // Render the main layout including the Navbar and the defined routes
  return (
    <div className="App">
      <Navbar
        setSideNavbarFunc={setSideNavbarFunc}
        sideNavbar={sideNavbar}
        onSearch={setSearchTerm}
      />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} searchTerm={searchTerm} />} />
        <Route path='/watch/:id' element={<Video sideNavbar={sideNavbar} />} />
        <Route path='/user/:id' element={<Channel sideNavbar={sideNavbar} />} />
        <Route path='/user/:id/upload' element={<VideoUpload />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/createChannel' element={<CreateChannel />} />
        <Route path='/channel/:channelId' element={<ViewChannel sideNavbar={sideNavbar} />} />
        <Route path='/user/:id/channel/:channelId/upload' element={<UploadChannelVideo />} />
        <Route path='/user/:id/channel/:channelId/edit-video/:videoId' element={<EditVideo />} />
      </Routes>
    </div>
  );
}

export default App;
