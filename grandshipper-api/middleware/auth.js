const jwt = require('jsonwebtoken');

// Validate the user token.
module.exports = (req, res, next) => {
    // Check if the user token exists. If not found return 401 - Unauthorized.
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Access denied. No token provided.');
    }
    // Extract the token from the authorization header
    const userToken = authHeader.split(' ')[1];
    if (!userToken || userToken.trim().length <= 0) {
        return res.status(401).send('Access denied. No token provided.');
    }

    // Check if the user token is valid - return the user with the decoded
    // payload to the next method. If invalid - return 400 - Bad Request.
    try {
        const decodedPayload = jwt.verify(userToken, process.env.JWT_PRIVATE_KEY);
        req.user = decodedPayload;
        if (next) {
            next();
        }
    } catch (err) {
        return res.status(400).send('Invalid token.');
    }
};