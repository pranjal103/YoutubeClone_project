// ============================================================================
// Middleware: auth
// Description: This middleware function checks for a valid JWT token in the
//              request cookies, verifies it, and attaches the corresponding user
//              (excluding the password) to the request object. If any check fails,
//              it responds with an appropriate error message.
// ============================================================================

const jwt = require('jsonwebtoken');
const User = require('../Modals/user');

const auth = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;
        const SECRET_KEY = process.env.JWT_SECRET || "Its_My_Secret_Key";
        console.log(token)
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        console.log("Token received:", token);

        // Verify JWT using the secret key
        const decoded = jwt.verify(token, SECRET_KEY);

        // Fetch user from database using the decoded token's userId and attach to request object
        req.user = await User.findById(decoded.userId).select('-password');
        
        // If no user is found, return an error response
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        // Log any JWT verification errors and send an unauthorized response
        console.error("JWT verification error:", err);
        return res.status(401).json({ error: 'Invalid token, authorization denied' });
    }
};

// Export the auth middleware
module.exports = auth;
