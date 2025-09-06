const userRepository = require("../repositories/userRepository")
const { v4: uuidv4 } = require("uuid");

module.exports = {
    async createUser(name) {
        const user = { userId: uuidv4(), name };
        await userRepository.createUser(user);
        return user;
    },

    async getUserById(userId) {
        return userRepository.getUserById(userId);
    }
};