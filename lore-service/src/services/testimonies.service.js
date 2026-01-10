const testimonyRepository = require('../repositories/testimony.repository');
const creatureRepository = require('../repositories/creature.repository');

class TestimonyService {
    async createTestimony(creatureId, authorId, description) {
        if (!description || description.trim().length === 0) {
            throw new Error('Description is required');
        }

        const creature = await creatureRepository.findById(creatureId);
        if (!creature) {
            throw new Error('Creature not found');
        }

        const recentTestimony = await testimonyRepository.findRecentByAuthorAndCreature(
            authorId,
            creatureId,
            5
        );

        if (recentTestimony) {
            throw new Error('You must wait 5 minutes before submitting another testimony for this creature');
        }

        return await testimonyRepository.create({
            creatureId,
            authorId,
            description: description.trim(),
            status: 'PENDING'
        });
    }

    async getCreatureTestimonies(creatureId) {
        const creature = await creatureRepository.findById(creatureId);
        if (!creature) {
            throw new Error('Creature not found');
        }

        return await testimonyRepository.findByCreatureId(creatureId);
    }

    async validateTestimony(testimonyId, validatorId, validatorRole) {
        if (!['EXPERT', 'ADMIN'].includes(validatorRole)) {
            throw new Error('Only EXPERT or ADMIN can validate testimonies');
        }

        const testimony = await testimonyRepository.findById(testimonyId);
        if (!testimony) {
            throw new Error('Testimony not found');
        }

        if (testimony.authorId.toString() === validatorId.toString()) {
            throw new Error('You cannot validate your own testimony');
        }

        if (testimony.status !== 'PENDING') {
            throw new Error('This testimony has already been processed');
        }

        const updatedTestimony = await testimonyRepository.update(testimonyId, {
            status: 'VALIDATED',
            validatedBy: validatorId,
            validatedAt: new Date()
        });
        await this.updateCreatureLegendScore(testimony.creatureId);

        return updatedTestimony;
    }

    async rejectTestimony(testimonyId, validatorId, validatorRole) {
        if (!['EXPERT', 'ADMIN'].includes(validatorRole)) {
            throw new Error('Only EXPERT or ADMIN can reject testimonies');
        }

        const testimony = await testimonyRepository.findById(testimonyId);
        if (!testimony) {
            throw new Error('Testimony not found');
        }

        if (testimony.authorId.toString() === validatorId.toString()) {
            throw new Error('You cannot reject your own testimony');
        }

        if (testimony.status !== 'PENDING') {
            throw new Error('This testimony has already been processed');
        }

        return await testimonyRepository.update(testimonyId, {
            status: 'REJECTED',
            validatedBy: validatorId,
            validatedAt: new Date()
        });
    }
    async updateCreatureLegendScore(creatureId) {
        try {
            const validatedCount = await creatureRepository.countValidatedTestimonies(creatureId);
            await creatureRepository.updateLegendScore(creatureId, validatedCount);
        } catch (error) {
            console.error('Error updating legend score:', error);
        }
    }
}

module.exports = new TestimonyService();