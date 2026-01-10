const axios = require('axios');

const authMiddleware = async (req, res, next) => {
  try {
    console.log('HEADERS =', req.headers);

    const token = req.headers.authorization?.split(' ')[1];
    console.log('TOKEN =', token);

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const response = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log('AUTH /me RESPONSE DATA =', response.data);

    req.user = response.data;
    console.log('REQ.USER =', req.user);

    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;