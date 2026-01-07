const Testimony = require('../models/Testimony');

class TestimonyRepository {
    async create(testimonyData) {
        const testimony = new Testimony(testimonyData);
        return await testimony.save();
    }

    async findById(id) {
        return await Testimony.findById(id)
            .populate('creatureId', 'name origin');
    }

    async findByCreatureId(creatureId) {
        return await Testimony.find({ creatureId })
            .sort({ createdAt: -1 });
    }

    // Vérifie si un témoignage récent existe (délai de 5 minutes)
    async findRecentByAuthorAndCreature(authorId, creatureId, minutes = 5) {
        const timeLimit = new Date(Date.now() - minutes * 60 * 1000);
        return await Testimony.findOne({
            authorId,
            creatureId,
            createdAt: { $gte: timeLimit }
        });
    }

    async update(id, updateData) {
        return await Testimony.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('creatureId', 'name origin');
    }
}

module.exports = new TestimonyRepository();