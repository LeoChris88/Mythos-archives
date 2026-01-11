const axios = require('axios');

/**
 * @param {string} userId 
 * @param {number} delta
 */
async function updateUserReputation(userId, delta) {
    try {
        const response = await axios.patch(
            `${process.env.AUTH_SERVICE_URL}/auth/users/${userId}/reputation`,
            { delta }
        );
        
        console.log(`Réputation mise à jour pour user ${userId}: ${delta > 0 ? '+' : ''}${delta}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur mise à jour réputation user ${userId}:`, error.message);
        return null;
    }
}

module.exports = { updateUserReputation };