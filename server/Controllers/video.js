// ============================================================================
// Controllers/video.js
// Description: Contains controller functions for handling video-related
// operations including upload, retrieval, update, deletion, and reactions.
// Dependencies: Video and Channel models are imported for data operations.
// ============================================================================

const Video = require('../Modals/video');
const Channel = require('../Modals/channel');

// -----------------------------------------------------------------------------
// Function: uploadVideo
// Description: Handles video upload by creating a new video document, determining
//              the appropriate channel association, and updating the channel's
//              videos array if applicable.
// -----------------------------------------------------------------------------
exports.uploadVideo = async (req, res) => {
  try {
    // Destructure video details and channel from request body
    const { title, description, videoLink, videoType, thumbnail, channel } = req.body;
    const userId = req.user ? req.user._id : "607d1b2f5b3c3a2493d2f1";
    
    // Determine the channel to associate with the video.
    let channelIdToUse = channel ? channel : null;
    if (!channelIdToUse) {
      // Try to find an existing channel for the user
      const userChannel = await Channel.findOne({ owner: userId });
      if (userChannel) {
        channelIdToUse = userChannel._id;
      }
    }

    // Create new video document with the determined channelId
    const videoUpload = new Video({
      user: userId,
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
      channelId: channelIdToUse
    });
    await videoUpload.save();

    // If a channel is associated, add the new video's ID to that channel's videos array
    if (channelIdToUse) {
      await Channel.findByIdAndUpdate(channelIdToUse, { $push: { videos: videoUpload._id } });
    }

    res.status(201).json({ success: "true", videoUpload });
  } catch (error) {
    console.error("Error in uploadVideo:", error);
    res.status(500).json({ error: error.message });
  }
};

// -----------------------------------------------------------------------------
// Function: getAllVideo
// Description: Retrieves all videos from the database and populates related user
//              and channel fields.
// -----------------------------------------------------------------------------
exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('user','channelName profilePic userName createdAt')
      .populate('channelId', 'avatar channelName');

    res.status(201).json({ success: "true", videos });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// -----------------------------------------------------------------------------
// Function: getVideoById
// Description: Retrieves a single video by its ID and populates related user and
//              channel fields.
// -----------------------------------------------------------------------------
exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id)
      .populate('user','channelName profilePic userName createdAt')
      .populate('channelId', 'avatar channelName');
    res.status(201).json({ success: "true", video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// -----------------------------------------------------------------------------
// Function: getAllVideoByUserID
// Description: Retrieves all videos uploaded by a specific user and populates the
//              user details.
// -----------------------------------------------------------------------------
exports.getAllVideoByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    const video = await Video.find({ user: userId })
      .populate('user','channelName profilePic userName createdAt about');
    res.status(201).json({ success: "true", video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// -----------------------------------------------------------------------------
// Function: likeVideo
// Description: Handles the liking of a video. It checks if the user already liked
//              the video, handles removal of a previous dislike if present, and
//              updates the like count.
// -----------------------------------------------------------------------------
exports.likeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Assumes authentication middleware sets req.user
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Ensure the reaction arrays exist
    if (!video.likeUsers) video.likeUsers = [];
    if (!video.dislikeUsers) video.dislikeUsers = [];

    // Check if user already liked the video
    if (video.likeUsers.includes(userId)) {
      return res.status(400).json({ error: "you already liked it" });
    }

    // If user previously disliked, remove the dislike and decrement dislike count
    if (video.dislikeUsers.includes(userId)) {
      video.dislikeUsers = video.dislikeUsers.filter(
        uid => uid.toString() !== userId.toString()
      );
      video.dislike = video.dislike - 1;
    }

    // Add user to likeUsers array and increment like count
    video.likeUsers.push(userId);
    video.like = video.like + 1;

    await video.save();
    res.status(200).json({ updatedLikes: video.like });
  } catch (error) {
    console.error("Error in likeVideo:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -----------------------------------------------------------------------------
// Function: dislikeVideo
// Description: Handles disliking a video. It checks if the user already disliked,
//              handles removal of a previous like if present, and updates the dislike count.
// -----------------------------------------------------------------------------
exports.dislikeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Assumes authentication middleware sets req.user
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Ensure the reaction arrays exist
    if (!video.likeUsers) video.likeUsers = [];
    if (!video.dislikeUsers) video.dislikeUsers = [];

    // Check if user already disliked the video
    if (video.dislikeUsers.includes(userId)) {
      return res.status(400).json({ error: "you already disliked it" });
    }

    // If user previously liked, remove the like and decrement like count
    if (video.likeUsers.includes(userId)) {
      video.likeUsers = video.likeUsers.filter(
        uid => uid.toString() !== userId.toString()
      );
      video.like = video.like - 1;
    }

    // Add user to dislikeUsers array and increment dislike count
    video.dislikeUsers.push(userId);
    video.dislike = video.dislike + 1;

    await video.save();
    res.status(200).json({ updatedDislikes: video.dislike });
  } catch (error) {
    console.error("Error in dislikeVideo:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -----------------------------------------------------------------------------
// Function: updateViews
// Description: Increments the view count of a video by one.
// -----------------------------------------------------------------------------
exports.updateViews = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ error: "Video not found" });
    video.views += 1;
    await video.save();
    res.status(200).json({ updatedViews: video.views });
  } catch (error) {
    console.error("Error updating views:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -----------------------------------------------------------------------------
// Function: deleteVideo
// Description: Deletes a video if the logged-in user is the owner of the video.
// -----------------------------------------------------------------------------
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the video by its ID
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    // Check if the logged-in user is the owner of the video
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized: You can only delete your own video" });
    }
    // Delete the video from the database
    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// -----------------------------------------------------------------------------
// Function: updateVideo
// Description: Updates the title and description of a video.
// -----------------------------------------------------------------------------
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params; // Get video ID from params
    const { title, description } = req.body; // Get updated fields from request

    const updatedVideo = await Video.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json({
      message: "Video updated successfully",
      video: updatedVideo,
    });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ error: "Server error while updating video" });
  }
};
