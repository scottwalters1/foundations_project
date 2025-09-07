const dynamoDB = require("../db/dynamoClient");

// figure out this or syntax here
const USERS_TABLE = process.env.USERS_TABLE || "Users";

async function createUser(user) {
  const params = { TableName: USERS_TABLE, Item: user };
  return dynamoDB.put(params).promise();
}

async function getUserByUsername(username) {
  const params = { TableName: USERS_TABLE, Key: { username } };
  const result = await dynamoDB.get(params).promise();
  return result.Item;
}

module.exports = {
  createUser,
  getUserByUsername,
};
