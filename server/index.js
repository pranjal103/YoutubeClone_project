const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3000', // React app's URL
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Initialize database connection
require('./Connections/conn');

const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');
const ChannelRoutes = require('./Routes/channel'); 

// Mount routes under descriptive endpoints
app.use('/auth', AuthRoutes);
app.use('/api', VideoRoutes);
app.use('/commentApi', CommentRoutes);
app.use('/api', ChannelRoutes); 


app.listen(port, () => { 
  console.log("Our backend project is running on Port 4000");
});