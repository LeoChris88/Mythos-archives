const testimonyService = require('../services/testimonies.service');

class TestimonyController {
    async createTestimony(req, res) {
        try {
            const { creatureId, description } = req.body;
            const authorId = req.user.id;

            const testimony = await testimonyService.createTestimony(
                creatureId,
                authorId,
                description
            );

            res.status(201).json({
                message: 'Testimony created successfully',
                testimony
            });
        } catch (error) {
            console.error('Create testimony error:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getCreatureTestimonies(req, res) {
        try {
            const { creatureId } = req.params;
            const testimonies = await testimonyService.getCreatureTestimonies(creatureId);

            res.status(200).json({
                count: testimonies.length,
                testimonies
            });
        } catch (error) {
            console.error('Get testimonies error:', error);
            res.status(404).json({ error: error.message });
        }
    }

    async validateTestimony(req, res) {
        try {
            const { id } = req.params;
            const validatorId = req.user.id;
            const validatorRole = req.user.role;

            const testimony = await testimonyService.validateTestimony(
                id,
                validatorId,
                validatorRole
            );

            res.status(200).json({
                message: 'Testimony validated successfully',
                testimony
            });
        } catch (error) {
            console.error('Validate testimony error:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async rejectTestimony(req, res) {
        try {
            const { id } = req.params;
            const validatorId = req.user.id;
            const validatorRole = req.user.role;

            const testimony = await testimonyService.rejectTestimony(
                id,
                validatorId,
                validatorRole
            );

            res.status(200).json({
                message: 'Testimony rejected successfully',
                testimony
            });
        } catch (error) {
            console.error('Reject testimony error:', error);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new TestimonyController();