// ============================================================================
// Routes/comment.js
// Description: Defines the routing for comment-related operations including
//              adding, retrieving, updating, and deleting comments.
//              Uses authentication middleware to protect the routes.
// ============================================================================

const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/comment');
const auth = require('../middleware/authentication');

// -----------------------------------------------------------------------------
// Route: POST /comment
// Description: Add a new comment to a video. Authentication is required.
// -----------------------------------------------------------------------------
router.post('/comment', auth, CommentController.addComment);

// -----------------------------------------------------------------------------
// Route: GET /comment/:videoId
// Description: Retrieve all comments for a specific video.
// -----------------------------------------------------------------------------
router.get('/comment/:videoId', CommentController.getCommentByVideoId);

// -----------------------------------------------------------------------------
// Route: PUT /updateComment/:commentId
// Description: Update an existing comment identified by commentId. Authentication is required.
// -----------------------------------------------------------------------------
router.put('/updateComment/:commentId', auth, CommentController.updateComment);

// -----------------------------------------------------------------------------
// Route: DELETE /deleteComment/:commentId
// Description: Delete a comment identified by commentId. Authentication is required.
// -----------------------------------------------------------------------------
router.delete('/deleteComment/:commentId', auth, CommentController.deleteComment);

module.exports = router;
