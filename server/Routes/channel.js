// ============================================================================
// Routes/channel.js
// Description: Defines the routing for channel-related operations including
//              creation, retrieval, update, and deletion of channels.
//              Uses authentication middleware to protect the routes.
// ============================================================================

const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channel');
const auth = require('../middleware/authentication');

// -----------------------------------------------------------------------------
// Route: POST /channel
// Description: Create a new channel. Authentication is required.
// -----------------------------------------------------------------------------
router.post('/channel', auth, ChannelController.createChannel);

// -----------------------------------------------------------------------------
// Route: GET /channel/user/:userId
// Description: Retrieve all channels for a specific user. Authentication is required.
// -----------------------------------------------------------------------------
router.get('/channel/user/:userId', auth, ChannelController.getChannelsByUser);

// -----------------------------------------------------------------------------
// Route: GET /channel/:channelId
// Description: Retrieve a single channel by its ID. Authentication is required.
// -----------------------------------------------------------------------------
router.get('/channel/:channelId', auth, ChannelController.getChannelById);

// -----------------------------------------------------------------------------
// Route: PUT /channel/:channelId
// Description: Update channel fields for a given channel ID. Authentication is required.
// -----------------------------------------------------------------------------
router.put('/channel/:channelId', auth, ChannelController.updateChannel);

// -----------------------------------------------------------------------------
// Route: DELETE /channel/:channelId
// Description: Delete a channel by its ID. Authentication is required.
// -----------------------------------------------------------------------------
router.delete('/channel/:channelId', auth, ChannelController.deleteChannel);

module.exports = router;
