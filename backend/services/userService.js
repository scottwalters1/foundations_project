const userRepository = require("../repositories/userRepository");

async function getUserByUsername(params) {
  const username = params.username;
  if (username === "" || typeof username !== 'string') {
    throw new Error("Invalid username");
  }
  const user = await userRepository.getUserByUsername(username);
  if (!user) return null;
  return sanitizeUser(user);
}

function deleteUserByUsername(params) {
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
