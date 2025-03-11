# YouTube Clone Using the MERN Stack

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/pranjal103/YoutubeClone_project) [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE) [![GitHub stars](https://img.shields.io/github/stars/pranjal103/YoutubeClone_project)](https://github.com/pranjal103/YoutubeClone_project/stargazers)

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
- [contact](#contact)
- [License](#license)
- [Roadmap](#roadmap)
- [Testing](#testing)
- [API Documentation](#api-documentation)

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

```



## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### Backend Setup

1. **Clone the Repository:**

- git clone https://github.com/pranjal103/YoutubeClone_project.git
- cd YoutubeClone_project/server

2. **Install Dependencies:**
- npm install

3. **Configure Environment Variables:**

    ***Create a .env file in the /server folder with the following:***

- PORT=4000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret

4. **Start the Backend Server:**
- npm start

### Frontend Setup

**Navigate to the Client Directory:**
- cd ../client
  
**Install Dependencies:**
- npm install

**Start the React Application:**
- npm start

***The application will run at http://localhost:3000.***

### Usage
- **Home Page:** Browse and search for videos.
- **Video Player:** Click on any video to watch it, interact with likes/dislikes, and add comments.
- **Authentication:** Register or log in to manage your channel.
- **Channel Management:** Create, update, or delete your channel and manage your videos.
- **File Uploads:** Videos and images are uploaded using Cloudinary integration.

### Demo
Click on the image below to watch the demo video:

[<img src="https://res.cloudinary.com/dldpmvy2l/image/upload/v1741693161/ddekewf5vrlfmgtbhvhj.png" alt="Watch the Demo" style="width:600px;">](https://res.cloudinary.com/dldpmvy2l/video/upload/v1741693335/afocuikh6xi07246x1li.mp4)

---

### Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

### Contact
***Email*** - pranjaltogalekar@gmail.com

## License

This project is licensed under the MIT License. For more details, please see the [LICENSE](LICENSE) file.

## Roadmap

- **Enhanced UI/UX:** Implement additional responsive improvements and animations.
- **Advanced Search:** Improve search functionality with auto-suggestions and filtering by categories.
- **User Profiles:** Expand user profile functionality to include more customization options.
- **API Expansion:** Add more detailed API endpoints and documentation for third-party integrations.
- **Testing Suite:** Develop a comprehensive testing suite for both front-end and back-end components.

## Testing

### Frontend Testing
- Use tools like Jest and React Testing Library to ensure components render correctly and user interactions work as expected.

### Backend Testing
- Implement tests with Mocha or Jest to validate API endpoints and data handling.

### End-to-End Testing
- Consider using Cypress to simulate user flows and catch integration issues early.

## API Documentation

### User Authentication Endpoints
All user authentication routes are prefixed with `/auth`.
- `POST /auth/signup`  
  Registers a new user.
- `POST /auth/login`  
  Authenticates an existing user and returns a JWT.
- `POST /auth/logout`  
  Logs out the authenticated user by clearing authentication tokens.

### Video Endpoints
These endpoints are prefixed with `/api`.
- `POST /api/video/upload`  
  Upload a new video. (Authentication required)
- `GET /api/allVideo`  
  Retrieve all videos.
- `GET /api/getVideoById/:id`  
  Retrieve details of a specific video by its ID.
- `GET /api/:userId/channel`  
  Retrieve all videos uploaded by a specific user.
- `PUT /api/video/like/:id`  
  Like a video. (Authentication required)
- `PUT /api/video/dislike/:id`  
  Dislike a video. (Authentication required)
- `PUT /api/video/view/:id`  
  Increment the view count for a video. (Authentication required)
- `DELETE /api/video/:id`  
  Delete a video. (Authentication required)
- `PUT /api/video/:id`  
  Update video details. (Authentication required)

### Comment Endpoints
These endpoints are prefixed with `/commentApi`.
- `POST /commentApi/comment`  
  Add a new comment to a video. (Authentication required)
- `GET /commentApi/comment/:videoId`  
  Retrieve all comments for a specific video.
- `PUT /commentApi/updateComment/:commentId`  
  Update an existing comment. (Authentication required)
- `DELETE /commentApi/deleteComment/:commentId`  
  Delete a comment. (Authentication required)

### Channel Endpoints
These endpoints are prefixed with `/api`.
- `POST /api/channel`  
  Create a new channel. (Authentication required)
- `GET /api/channel/user/:userId`  
  Retrieve all channels for a specific user. (Authentication required)
- `GET /api/channel/:channelId`  
  Retrieve a single channel by its ID. (Authentication required)
- `PUT /api/channel/:channelId`  
  Update channel information. (Authentication required)
- `DELETE /api/channel/:channelId`  
  Delete a channel. (Authentication required)

