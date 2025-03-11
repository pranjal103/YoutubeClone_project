# 🎥 MERN Stack YouTube Clone Project

---

## 🚀 Demo Video

Click on the image below to watch the demo video:

[<img src="https://res.cloudinary.com/dldpmvy2l/image/upload/v1741693161/ddekewf5vrlfmgtbhvhj.png" alt="Watch the Demo" style="width:600px;">](https://res.cloudinary.com/dldpmvy2l/video/upload/v1741693335/afocuikh6xi07246x1li.mp4)

---

## Overview

This feature-rich **YouTube Clone** application is built using the **MERN stack** (MongoDB, Express.js, React, and Node.js) with cloud storage and secure authentication. It allows users to upload, stream, and interact with videos seamlessly—mimicking the core features of YouTube.

---

## Key Functionalities

This full-stack web application offers functionalities similar to YouTube, including:

- **Video Upload & Management:** Upload, manage, and delete videos.
- **Cloud Streaming:** Stream videos directly from the cloud.
- **Secure Authentication:** Sign up and sign in securely using JWT (JSON Web Tokens).
- **Content Exploration:** Browse, search, and view video content.
- **Responsive Interface:** Enjoy a clean and responsive user experience across devices.

The project uses **Cloudinary** for video and image storage, **MongoDB** as the database, and **CSS** for styling. The backend is powered by **Node.js** and **Express.js**, while the frontend leverages **React** to build an interactive UI.

---

## ✨ Features

### 🎨 Modern UI Layouts

#### Homepage
- **Header:** Includes a search bar and a login/signup button for unauthenticated users.
- **Sidebar:** A collapsible menu displaying categories and filters.
- **Video Grid:** Shows video cards with thumbnails, titles, channel names, and view counts.

#### Video Player Page
- **Video Player:** Streams the selected video.
- **Details Section:** Displays the video title, description, channel name, likes, and dislikes.
- **Comments Section:** Allows users to add, edit, and delete comments.

#### Channel Page
- **Channel Management:** Enables users to create, edit, or delete videos within their channel.
- **Channel Stats:** Displays channel-specific details such as banners, subscriber count, and video lists.

### 📹 Core Functionalities
- **User Authentication:** Secure sign-up and sign-in using JWT.
- **Video Uploads:** Upload videos and store them securely on Cloudinary.
- **Video Streaming:** Stream videos with optimal performance.
- **Video Management:** View and delete uploaded videos as needed.
- **Search & Filter:** Search videos by title or description.
- **Interactive UI:** Clean and responsive design using CSS.

### 🔐 Security
- **Protected API Routes:** Secured with JWT to ensure data safety.
- **Secure Token Storage:** Authentication tokens are stored securely to avoid vulnerabilities.

### ⚡ Responsive Design
- **Cross-Device Compatibility:** A user interface that adapts seamlessly across desktops, tablets, and mobile devices.

---

## 🛠️ Technologies Used

### 🌐 Frontend
- **React:** Library for building dynamic user interfaces.
- **React Router:** Implements client-side routing.
- **Axios:** For making API requests.
- **CSS:** Used for styling and creating responsive designs.

### 🔙 Backend
- **Node.js:** JavaScript runtime environment for server-side scripting.
- **Express.js:** Lightweight framework for building REST APIs.

### 💾 Database & Cloud Storage
- **MongoDB:** NoSQL database for storing user and video data.
- **Cloudinary:** For secure storage and management of video uploads.

### 🔐 Authentication
- **JWT (JSON Web Tokens):** Provides secure user authentication and authorization.

### 🧰 Version Control
- **Git:** For tracking changes and collaborating on the source code.

---

## 📂 Folder Structure

```plaintext
client
├── src
│   ├── Component
│   │   ├── Navbar
│   │   │   └── navbar.js
│   │   ├── SideNavbar
│   │   │   └── sideNavbar.js
│   │   └── Login
│   │       └── login.js
│   ├── Pages
│   │   ├── Channel
│   │   │   ├── channel.js
│   │   │   ├── viewChannel.js
│   │   │   └── editVideo.js
│   │   ├── Home
│   │   │   └── homePage.js
│   │   ├── Video
│   │   │   └── video.js
│   │   ├── VideoUpload
│   │   │   └── videoUpload.js
│   │   └── SignUp
│   │       └── signUp.js
│   ├── App.js
│   └── index.js
server
├── controllers
│   ├── user.js
│   ├── video.js
│   ├── comment.js
│   └── channel.js
├── Routes
│   ├── user.js
│   ├── video.js
│   ├── comment.js
│   └── channel.js
├── Modals
│   ├── user.js
│   ├── video.js
│   ├── comment.js
│   └── channel.js
├── middleware
│   └── authentication.js
├── Connections
│   └── conn.js  
└── index.js
