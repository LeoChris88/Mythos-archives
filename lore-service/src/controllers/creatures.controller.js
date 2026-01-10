const creatureService = require('../services/creatures.service');

class CreatureController {
    async createCreature(req, res) {
        try {
            console.log('REQ.USER (controller) =', req.user);

            const { name, origin } = req.body;
            const authorId = req.user.id;

            console.log('AUTHOR ID =', authorId);

            const creature = await creatureService.createCreature(name, origin, authorId);
            
            res.status(201).json({
                message: 'Creature created successfully',
                creature
            });
        } catch (error) {
            console.error('Create creature error:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getCreatureById(req, res) {
        try {
            const { id } = req.params;
            const creature = await creatureService.getCreatureById(id);
            
            res.status(200).json(creature);
        } catch (error) {
            console.error('Get creature error:', error);
            res.status(404).json({ error: error.message });
        }
    }
    
    async getAllCreatures(req, res) {
        try {
            const creatures = await creatureService.getAllCreatures();
            
            res.status(200).json({
                count: creatures.length,
                creatures
            });
        } catch (error) {
            console.error('Get all creatures error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CreatureController();