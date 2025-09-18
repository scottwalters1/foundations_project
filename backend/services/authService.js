const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logger } = require("../util/logger");
const { AppError } = require("../util/appError");

const userRepository = require("../repositories/userRepository");
const User = require("../models/User");

async function register(user) {
  if (await userInDB(user)) {
    logger.warn("Username already registered");
    throw new AppError("Username already registered", 400);
  }
  if (validateUser(user)) {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(user.password, saltRounds);
    const userToAdd = new User({
      username: user.username,
      password: hashed,
      role: user.role,
      createdAt: Date.now(),
    });

    const addedUser = await userRepository.createUser(userToAdd);
    logger.info(`Creating new user: ${user.username}`);
    return addedUser;
  } else {
    logger.warn("Invalid username or password");
    throw new AppError("Invalid username or password", 400);
  }
}

// Brian's code - maybe cite
function validateUser(user) {
  const usernameResult = user.username.length > 0;
  const passwordResult = user.password.length > 0;
  return usernameResult && passwordResult;
}

async function userInDB(user) {
  const userInDB = await userRepository.getUserByUsername(user.username);
  return userInDB;
}

async function login(username, password) {
  const user = await userRepository.getUserByUsername(username);
  const valid = await bcrypt.compare(password, user.password);
  if (!valid || !user) {
    throw new AppError("Invalid credentials", 400);
  } 
  return user;
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { register, login, verifyToken };
