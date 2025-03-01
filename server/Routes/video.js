// ============================================================================
// Routes/video.js
// Description: Defines the routing for video-related operations including
//              video upload, retrieval, updating reactions (like, dislike, view),
//              deletion, and update of video details.
//              Uses authentication middleware for protected routes.
// ============================================================================

const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/video'); // use lower-case videoController consistently
const auth = require('../middleware/authentication');

// -----------------------------------------------------------------------------
// Route: POST /video/upload
// Description: Upload a new video. Authentication is required.
// -----------------------------------------------------------------------------
router.post('/video/upload', auth, videoController.uploadVideo);

// -----------------------------------------------------------------------------
// Route: GET /allVideo
// Description: Retrieve all videos.
// -----------------------------------------------------------------------------
router.get('/allVideo', videoController.getAllVideo);

// -----------------------------------------------------------------------------
// Route: GET /getVideoById/:id
// Description: Retrieve a specific video by its ID.
// -----------------------------------------------------------------------------
router.get('/getVideoById/:id', videoController.getVideoById);

// -----------------------------------------------------------------------------
// Route: GET /:userId/channel
// Description: Retrieve all videos uploaded by a specific user.
// -----------------------------------------------------------------------------
router.get('/:userId/channel', videoController.getAllVideoByUserID);

// -----------------------------------------------------------------------------
// Route: PUT /video/like/:id
// Description: Like a video. Authentication is required.
// -----------------------------------------------------------------------------
router.put('/video/like/:id', auth, videoController.likeVideo);

// -----------------------------------------------------------------------------
// Route: PUT /video/dislike/:id
// Description: Dislike a video. Authentication is required.
// -----------------------------------------------------------------------------
router.put('/video/dislike/:id', auth, videoController.dislikeVideo);

// -----------------------------------------------------------------------------
// Route: PUT /video/view/:id
// Description: Increment view count for a video. Authentication is required.
// -----------------------------------------------------------------------------
router.put('/video/view/:id', auth, videoController.updateViews);

// -----------------------------------------------------------------------------
// Route: DELETE /video/:id
// Description: Delete a video. Authentication is required.
// -----------------------------------------------------------------------------
router.delete('/video/:id', auth, videoController.deleteVideo);

// -----------------------------------------------------------------------------
// Route: PUT /video/:id
// Description: Update video details. Authentication is required.
// -----------------------------------------------------------------------------
router.put('/video/:id', auth, videoController.updateVideo);

module.exports = router;
