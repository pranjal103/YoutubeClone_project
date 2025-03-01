// ============================================================================
// Controller/user.js
// Description: Handles user authentication functions including sign-up, sign-in,
//              and logout functionalities using bcrypt for password hashing
//              and JWT for token-based authentication.
// Dependencies: User model, bcryptjs, jsonwebtoken.
// ============================================================================

const User = require('../Modals/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// -----------------------------------------------------------------------------
// Cookie Options
// Description: Configuration for HTTP-only cookies. In production, secure should be set to true.
// -----------------------------------------------------------------------------
const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: 'Lax'
};

// -----------------------------------------------------------------------------
// Function: signUp
// Description: Registers a new user by checking for existing usernames, hashing the password,
//              and saving the user data to the database.
// -----------------------------------------------------------------------------
exports.signUp = async (req, res) => {
    try {
        const { channelName, userName, about, profilePic, password, email, avatar } = req.body;
        // Use channelName if provided; otherwise default to userName
        const finalChannelName = channelName || userName;
        
        // Check if the username already exists
        const isExist = await User.findOne({ userName });
        if (isExist) {
            return res.status(400).json({ error: "Username already exists. Please try with another username" });
        }
        // Hash the password before saving
        const updatedPass = await bcrypt.hash(password, 10);
        // Create the new user including all fields
        const user = new User({
            channelName: finalChannelName,
            userName,
            about,
            profilePic,
            password: updatedPass,
            email,
            avatar
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully", success: "Yes", data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// -----------------------------------------------------------------------------
// Function: signIn
// Description: Authenticates the user by verifying credentials, generating a JWT,
//              setting the token in an HTTP-only cookie, and returning the user data.
// -----------------------------------------------------------------------------
exports.signIn = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const SECRET_KEY = process.env.JWT_SECRET || "Its_My_Secret_Key";

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, SECRET_KEY);
            res.cookie('token', token, cookieOptions);
            res.json({ message: "Logged in successfully", success: "true", token, user });
            console.log(token);
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// -----------------------------------------------------------------------------
// Function: logout
// Description: Logs out the user by clearing the authentication cookie.
// -----------------------------------------------------------------------------
exports.logout = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
};
