const userRepository = require("../repositories/userRepository");

function getUserByUsername(params) {
  // change this to separate username and validate maybe
  return userRepository.getUserByUsername(params.username);
}

function deleteUserByUsername(params) {
  // change this to separate username and validate maybe
  return userRepository.deleteUserByUsername(params.username);
}

module.exports = {
  getUserByUsername,
  deleteUserByUsername
};
