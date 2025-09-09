const dynamoDB = require("../db/dynamoClient");

// using USERS_TABLE env var, string if it is falsy
const USERS_TABLE = process.env.USERS_TABLE || "Users";

async function createUser(user) {
  const params = { TableName: USERS_TABLE, Item: user };
  return dynamoDB.put(params).promise();

  // Change to return null in catch error
  // for truthy and falsy return values
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
