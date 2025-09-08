const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");
const User = require("../models/User");

async function register(username, password, role) {
  const userInDb = await userRepo.getUserByUsername(username);
  if (userInDb) throw new Error("Username already registered");

  // hashing after checking for user already existing
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashed,
    role,
    createdAt: Date.now(),
  });

  await userRepo.createUser(user);
  return { message: "User registered" };
}

async function login(username, password) {
  const user = await userRepo.getUserByUsername(username);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ sub: user.username }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return { token };
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { register, login, verifyToken };
