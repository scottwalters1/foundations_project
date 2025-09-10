const userRepository = require("../repositories/userRepository");
const User = require("../models/User");

function getUserByUsername(data) {
  // change this to separate username and validate maybe
  return userRepository.getUserByUsername(data.username);
}

module.exports = {
  getUserByUsername,
};
