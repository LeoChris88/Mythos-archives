const Creature = require('../models/Creature');

class CreatureRepository {
    async create(creatureData) {
        const creature = new Creature(creatureData);
        return await creature.save();
    }

    async findById(id) {
        return await Creature.findById(id);
    }

    async findByName(name) {
        return await Creature.findOne({ name });
    }

    async findAll() {
        return await Creature.find().sort({ createdAt: -1 });
    }
}

module.exports = new CreatureRepository();