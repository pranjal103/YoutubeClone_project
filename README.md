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
