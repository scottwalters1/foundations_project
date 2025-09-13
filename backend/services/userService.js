const userRepository = require("../repositories/userRepository");

async function getUserByUsername(params) {
  // change this to separate username and validate maybe
  const user = await userRepository.getUserByUsername(params.username);
  if (!user) return null;
  return sanitizeUser(user);
}

function deleteUserByUsername(params) {
  // change this to separate username and validate maybe
  return userRepository.deleteUserByUsername(params.username);
}

// removing password before returning to controller
function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  getUserByUsername,
  deleteUserByUsername
};
