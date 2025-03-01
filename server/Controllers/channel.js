// ============================================================================
// Controllers/channel.js
// Description: Contains controller functions for channel operations such as 
//              creating, retrieving, updating, and deleting channels.
// Dependencies: Channel, Video, and User models.
// ============================================================================

const Channel = require('../Modals/channel');
const Video = require('../Modals/video');
const User = require('../Modals/user');

/* ---------------------------------------------------------------------------
Function: createChannel
Description: Creates a new channel by generating a handle from the channel name 
             if not provided, setting a default avatar, and ensuring the handle is unique.
--------------------------------------------------------------------------- */
exports.createChannel = async (req, res) => {
  try {
    const { owner, channelName, handle, avatar, description, channelBanner, subscribers, videos } = req.body;
    
    // If no handle is provided, generate one from channelName
    const finalHandle = handle || channelName.replace(/\s+/g, '').toLowerCase();
    // If no avatar is provided, use a default placeholder
    const finalAvatar = avatar || "https://via.placeholder.com/150?text=Avatar";
    
    // Check if a channel with the same handle already exists
    const existingChannel = await Channel.findOne({ handle: finalHandle });
    if (existingChannel) {
      return res.status(400).json({ error: "Channel handle already exists. Please choose another." });
    }

    // Create and save the new channel with defaults for subscribers and videos if not provided
    const channel = new Channel({
      owner,
      channelName,
      handle: finalHandle,
      avatar: finalAvatar,
      description: description || "",
      channelBanner: channelBanner || "https://via.placeholder.com/600x200?text=Channel+Banner",
      subscribers: subscribers || 0,
      videos: videos || []
    });
    await channel.save();

    res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    console.error("Error in createChannel:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

/* ---------------------------------------------------------------------------
Function: getChannelsByUser
Description: Retrieves all channels that belong to a specific user.
--------------------------------------------------------------------------- */
exports.getChannelsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const channels = await Channel.find({ owner: userId });
    res.status(200).json({ channels });
  } catch (error) {
    console.error("Error in getChannelsByUser:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

/* ---------------------------------------------------------------------------
Function: getChannelById
Description: Retrieves a specific channel by its ID and populates its associated videos.
--------------------------------------------------------------------------- */
exports.getChannelById = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId).populate('videos');
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    res.status(200).json({
      channel,
      videos: channel.videos
    });
  } catch (error) {
    console.error("Error in getChannelById:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

/* ---------------------------------------------------------------------------
Function: updateChannel
Description: Updates channel details based on the provided channelId and data.
--------------------------------------------------------------------------- */
exports.updateChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const updates = req.body;
    
    const updatedChannel = await Channel.findByIdAndUpdate(channelId, updates, { new: true });
    if (!updatedChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    res.status(200).json({ message: "Channel updated successfully", channel: updatedChannel });
  } catch (error) {
    console.error("Error updating channel:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/* ---------------------------------------------------------------------------
Function: deleteChannel
Description: Deletes a channel identified by channelId.
--------------------------------------------------------------------------- */
exports.deleteChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const deletedChannel = await Channel.findByIdAndDelete(channelId);
    if (!deletedChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    // Send success message if deletion is successful
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("Error deleting channel:", error);
    res.status(500).json({ error: "Server error while deleting channel" });
  }
};
