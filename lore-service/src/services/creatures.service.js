const creatureRepository = require('../repositories/creature.repository');

class CreatureService {
    async createCreature(name, origin, authorId) {
        console.log('SERVICE authorId =', authorId);
        const existingCreature = await creatureRepository.findByName(name);
        if (existingCreature) {
            throw new Error('A creature with this name already exists');
        }
        if (!name || name.trim().length === 0) {
            throw new Error('Creature name is required');
        }

        return await creatureRepository.create({
            name: name.trim(),
            origin: origin || 'Inconnu',
            authorId
        });
    }

    async getCreatureById(id) {
        const creature = await creatureRepository.findById(id);
        if (!creature) {
            throw new Error('Creature not found');
        }
        return creature;
    }

    async getAllCreatures() {
        return await creatureRepository.findAll();
    }
}

module.exports = new CreatureService();