const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");
const User = require("../models/User");

async function register(user) {
  // add validate user
  if (await userInDB(user)) {
    // add logger here
    console.log("Username already registered");
    return null;
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

    const addedUser = await userRepo.createUser(userToAdd);
    // logger here instead
    return addedUser;
  }
}

// Brian's code - maybe cite
function validateUser(user) {
  const usernameResult = user.username.length > 0;
  const passwordResult = user.password.length > 0;
  return usernameResult && passwordResult;
}

async function userInDB(user) {
  const userInDB = await userRepo.getUserByUsername(user.username);
  return userInDB;
}

async function login(username, password) {
  const user = await userRepo.getUserByUsername(username);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ sub: user.username }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return { user, token };
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { register, login, verifyToken };
