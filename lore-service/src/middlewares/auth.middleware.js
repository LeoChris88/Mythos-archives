const axios = require('axios');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        req.user = response.data;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;