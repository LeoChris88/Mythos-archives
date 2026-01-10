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

    async findAll(sortBy = 'createdAt') {
        const sortOrder = sortBy === 'legendScore' ? -1 : 1;
        return await Creature.find().sort({ [sortBy]: sortOrder });
    }

    async updateLegendScore(creatureId, validatedTestimoniesCount) {
        const legendScore = 1 + (validatedTestimoniesCount / 5);

        return await Creature.findByIdAndUpdate(
            creatureId,
            { legendScore },
            { new: true }
        );
    } 
    async countValidatedTestimonies(creatureId) {
        const Testimony = require('../models/Testimony');
        return await Testimony.countDocuments({
            creatureId,
            status: 'VALIDATED'
        });
    }
}

module.exports = new CreatureRepository();