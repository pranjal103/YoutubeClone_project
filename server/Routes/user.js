// ============================================================================
// Routes/user.js
// Description: Defines the routing for user-related operations including
//              sign-up, sign-in, and logout functionalities.
// ============================================================================

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// -----------------------------------------------------------------------------
// Route: POST /signup
// Description: Registers a new user by handling the sign-up process.
// -----------------------------------------------------------------------------
router.post('/signup', UserController.signUp);

// -----------------------------------------------------------------------------
// Route: POST /login
// Description: Authenticates an existing user by handling the sign-in process.
// -----------------------------------------------------------------------------
router.post('/login', UserController.signIn);

// -----------------------------------------------------------------------------
// Route: POST /logout
// Description: Logs out the authenticated user by clearing authentication tokens.
// -----------------------------------------------------------------------------
router.post('/logout', UserController.logout);

module.exports = router;
