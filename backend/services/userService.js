const userRepository = require("../repositories/userRepository");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

async function createUser(data) {
  //   const user = { userName };
  const user = new User(data);
  await userRepository.createUser(user);
  return user;
}

async function getUserByUsername(data) {
  return userRepository.getUserByUsername(data.userName);
}

module.exports = {
  createUser,
  getUserByUsername,
};
