const userRepository = require("../repositories/userRepository");
const { v4: uuidv4 } = require("uuid");

async function createUser(userName) {
  const user = { userName };
  await userRepository.createUser(user);
  return user;
}

async function getUserByUsername(userName) {
  return userRepository.getUserByUsername(userName);
}

module.exports = {
  createUser,
  getUserByUsername,
};
