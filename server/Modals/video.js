// ============================================================================
// Mongoose Model: Video
// Description: Defines the schema for a Video entity including details such as
//              title, description, video link, thumbnail, reactions, channel,
//              uploader, views, and associated comments. Virtual properties are
//              set up for easy access to videoId, thumbnailUrl, likes, dislikes, 
//              and uploadDate.
// ============================================================================


const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  videoLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  videoType: {
    type: String,
    default: "All"
  },
  like: {
    type: Number,
    default: 0
  },
  dislike: {
    type: Number,
    default: 0
  },
  // NEW: Arrays to track individual user reactions
  likeUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  dislikeUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel',
  },
  uploader: {
    type: String,
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }]
}, { timestamps: true });

videoSchema.virtual("videoId").get(function () {
  return this._id.toHexString();
});

videoSchema.virtual("thumbnailUrl").get(function () {
  return this.thumbnail;
});

videoSchema.virtual("likes").get(function () {
  return this.like;
});

videoSchema.virtual("dislikes").get(function () {
  return this.dislike;
});

videoSchema.virtual("uploadDate").get(function () {
  return this.createdAt ? this.createdAt.toISOString().split('T')[0] : null;
});

videoSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model('video', videoSchema);
