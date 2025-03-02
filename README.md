# YouTube Clone Using the MERN Stack

Welcome to the YouTube Clone project built with the MERN stack. This project replicates key features of YouTube, including video browsing, playback, user interaction (likes, dislikes, and comments), and channel management. It is designed as a capstone project to demonstrate full-stack development using MongoDB, Express, React, and Node.js.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

This project is a fully functional YouTube clone that enables users to:
- **Browse Videos:** View a grid of video thumbnails on the home page.
- **Watch Videos:** Play videos with interactive controls including like/dislike and comments.
- **User Interaction:** Add, edit, and delete comments on videos.
- **Channel Management:** Create and manage channels, upload videos, and edit or delete content.
- **User Authentication:** Register and log in using JWT-based authentication.
- **Responsive Design:** Enjoy a consistent experience on desktop, tablet, and mobile devices.

## Features

### Front-End (React)
- **Home Page:**  
  - Responsive layout with a YouTube-style header and sidebar.
  - Video grid display with search and filter functionality.
- **Video Player Page:**  
  - Video playback with controls.
  - Real-time like/dislike updates and comment management.
- **Channel Page:**  
  - Channel profile featuring banner, avatar, and video listings.
  - Options for channel owners to upload, edit, or delete videos.
- **User Authentication:**  
  - Signup and Login forms with JWT-based session management.
- **File Uploads:**  
  - Integration with Cloudinary for handling video and image uploads.

### Back-End (Node.js & Express)
- **API Endpoints:**  
  - **User Routes:** Signup, Login, Logout.
  - **Video Routes:** Upload, fetch, update, delete videos, and update view counts.
  - **Comment Routes:** Add, update, and delete comments.
  - **Channel Routes:** Create, update, and delete channels.
- **Database:**  
  - MongoDB for storing users, videos, channels, and comments.
- **Security:**  
  - JWT-based authentication and middleware to protect sensitive routes.

## Technologies Used

- **Frontend:** React, React Router, Axios, Material UI, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, JWT for authentication
- **File Uploads:** Cloudinary
- **Version Control:** Git, GitHub

## Folder Structure

