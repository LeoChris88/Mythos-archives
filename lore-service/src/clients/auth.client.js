const axios = require('axios');

const authClient = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL
});

module.exports = {
  addReputation: async (userId, delta, token) => {
    return authClient.patch(
      `/auth/users/${userId}/reputation`,
      { delta },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
};