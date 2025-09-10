const { PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const documentClient = require("../db/dynamoClient");

// using USERS_TABLE env var, string if it is falsy
const USERS_TABLE = process.env.USERS_TABLE || "Users";

async function createUser(user) {
  const command = new PutCommand({
    TableName: USERS_TABLE,
    Item: user,
  });

  try {
    await documentClient.send(command);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUserByUsername(username) {
  const command = new GetCommand({
    TableName: USERS_TABLE,
    Key: { username },
  });

  try {
    const data = await documentClient.send(command);
    return data.Item;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
};
