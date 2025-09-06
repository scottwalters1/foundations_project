const dynamoDB = require("../db/dynamoClient");

// figure out this or syntax here
const USERS_TABLE = process.env.USERS_TABLE || "Users";

module.exports = {
    async createUser(user) {
        const params = { TableName: USERS_TABLE, Item: user };
        return dynamoDB.put(params).promise();
    },

    async getUserById(userId) {
        const params = { TableName: USERS_TABLE, Key: { userId }};
        const result = await dynamoDB.get(params).promise();
        return result.Item;
    }
};