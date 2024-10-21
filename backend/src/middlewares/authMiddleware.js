// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware function to authenticate a token
const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' }); // Unauthorized if no token
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' }); // Forbidden if token is invalid
    }

    req.user = user; // Add the user data to the request object
    next(); // Continue to the next middleware or route handler
  });
};

module.exports = authenticateToken;
