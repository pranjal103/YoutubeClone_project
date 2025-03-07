// ============================================================================
// Mongoose Model: Channel
// Description: Defines the schema for a Channel entity with fields for owner,
//              channel name, unique handle, description, channel banner,
//              avatar, subscriber count, and an array of video references.
//              Timestamps are enabled to track creation and modification times.
// ============================================================================


const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Ensure this matches your actual User model name
    required: true
  },
  channelName: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ""
  },
  channelBanner: {
    type: String,
    default: "https://via.placeholder.com/600x200"
  },
  avatar: {
    type: String,
    required: true
  },
  subscribers: {
    type: Number,
    default: 0
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video'
  }]
}, { timestamps: true });

module.exports = mongoose.model('channel', channelSchema);
