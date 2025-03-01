// ============================================================================
// Mongoose Model: User
// Description: Defines the schema for a User entity with fields for channel name,
//              username, password, about, profile picture, email, avatar, and an array
//              of channels. Timestamps are enabled to track creation and updates.
// ============================================================================


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: true
  },
  channels: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
