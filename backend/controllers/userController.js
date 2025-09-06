const userService = require("../services/userService");

module.exports = {
    createUser: async (req, res) => {
        const { name } = req.body;
        try {
            const user = await userService.createUser(name);
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },

    getUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            if (!user) return res.status(404).json({ error: "User not found"});
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
};