// ============================================================================
// Controllers/comment.js
// Description: Contains controller functions for comment operations such as
//              adding, retrieving, updating, and deleting comments.
// Dependencies: Comment model from '../Modals/comment'
// ============================================================================

const Comment = require('../Modals/comment');

/* ---------------------------------------------------------------------------
Function: addComment
Description: Adds a new comment to a video. If the user is not authenticated,
             a default user ID is used.
--------------------------------------------------------------------------- */
exports.addComment = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : "607d1b2f5b3c3a2493d2f1";
    const { video, text } = req.body;
    const comment = new Comment({
      user: userId,
      video,
      text
    });
    await comment.save();
    res.status(201).json({ message: "Success", comment });
  } catch (error) {
    console.error("Error in addComment:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ---------------------------------------------------------------------------
Function: getCommentByVideoId
Description: Retrieves all comments for a specific video and populates user details
             for each comment.
--------------------------------------------------------------------------- */
exports.getCommentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId })
      .populate('user','channelName profilePic userName createdAt about');
    res.status(201).json({ message: "Success", comments });
  } catch (error) {
    console.error("Error in getCommentByVideoId:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

/* ---------------------------------------------------------------------------
Function: updateComment
Description: Updates a comment's text based on the commentId provided in the parameters.
--------------------------------------------------------------------------- */
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    console.error("Error in updateComment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/* ---------------------------------------------------------------------------
Function: deleteComment
Description: Deletes a comment identified by commentId.
--------------------------------------------------------------------------- */
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error in deleteComment:", error);
    res.status(500).json({ error: "Server error" });
  }
};
