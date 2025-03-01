**YouTube Clone Using the MERN Stack**
Welcome to the YouTube Clone project built with the MERN stack. This project replicates key features of YouTube, including user authentication, video upload and playback, commenting, and channel management. The project demonstrates real-world full-stack application development using MongoDB, Express, React, and Node.js.

Table of Contents
Project Overview
Features
Technologies Used
Folder Structure
Installation and Setup
Usage
Demo
Contributing
License
Contact
Project Overview
This project is a fully functional YouTube clone that allows users to:

View a grid of video thumbnails on the home page.
Search and filter videos by category.
Register, log in, and manage user sessions with JWT-based authentication.
Watch videos, like/dislike them, and add comments.
Manage channels by creating a channel profile, uploading videos, and editing or deleting content.
Experience a responsive design across various devices.
The project is designed to showcase your understanding of full-stack development concepts and best practices in a real-world scenario.

Features
Front-End (React)
Home Page:
Responsive video grid display with YouTube-like header and sidebar.
Integrated search bar and filter options.
Video Player Page:
Video playback with controls, like/dislike functionality, and comments section.
Ability to add, edit, and delete comments.
Channel Page:
Channel profile with banner, avatar, and video list.
Options for channel owners to upload, edit, or delete videos.
User Authentication:
Registration and login forms.
JWT-based authentication to protect private routes.
Back-End (Node.js & Express)
API Endpoints:
User authentication (signup, login, logout).
Video management (upload, update, delete, fetch video details, update view counts).
Channel management (create, update, delete channel).
Comment management (add, update, delete comments).
Database:
MongoDB for storing user, video, channel, and comment data.
Security:
Use of JWT for secure route protection.
Authentication middleware to ensure secure access.
File Uploads
Integration with Cloudinary for uploading video files and images (thumbnails, channel banners, avatars).
Technologies Used
Frontend: React, React Router, Axios, Material UI, React Toastify
Backend: Node.js, Express.js, MongoDB, JWT for authentication
Other: Cloudinary for file uploads, Git for version control
Folder Structure
pgsql
Copy
Edit
/client
├── /src
│   ├── /Component
│   │   ├── Navbar
│   │   │   └── navbar.js
│   │   ├── SideNavbar
│   │   │   └── sideNavbar.js
│   │   └── Login
│   │       └── login.js
│   ├── /Pages
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
/server
├── /controllers
│   ├── user.js
│   ├── video.js
│   ├── comment.js
│   └── channel.js
├── /Routes
│   ├── user.js
│   ├── video.js
│   ├── comment.js
│   └── channel.js
├── /Modals
│   ├── user.js
│   ├── video.js
│   ├── comment.js
│   └── channel.js
├── /middleware
│   └── authentication.js
├── /Connections
│   └── conn.js
└── index.js
Installation and Setup
Prerequisites
Node.js and npm installed
MongoDB installed locally or access to MongoDB Atlas
Backend Setup
Navigate to the /server directory:
bash
Copy
Edit
cd server
Install dependencies:
bash
Copy
Edit
npm install
Create a .env file and add your environment variables:
env
Copy
Edit
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:
bash
Copy
Edit
npm start
Frontend Setup
Navigate to the /client directory:
bash
Copy
Edit
cd client
Install dependencies:
bash
Copy
Edit
npm install
Start the React development server:
bash
Copy
Edit
npm start
The application should now be running at http://localhost:3000.

Usage
Home Page: Browse videos, use the search bar to filter content.
Video Playback: Click on any video to watch it, interact using likes/dislikes and comments.
User Authentication: Sign up or log in to access personalized features like channel management.
Channel Management: Create and manage your channel by uploading and editing videos.
File Uploads: Videos and images are uploaded to Cloudinary.
Demo
For a live demonstration, please refer to the demo video included in the repository or watch the video hosted on YouTube Demo Link.

Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

License
This project is licensed under the MIT License.

Contact
For any queries or support, please contact:

Name: Pranjal 
