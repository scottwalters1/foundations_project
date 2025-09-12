const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {logger} = require("../util/logger");

const { setToken }  = require("../util/token");

const authService = require("../services/authService");

router.post("/register", validatePostUser, async (req, res) => {
  const user = await authService.register(req.body);
  if (user) {
    res
      .status(201)
      .json({ message: `Registered User ${JSON.stringify(user)}` });
  } else {
    res.status(400).json({ message: "user not created", data: req.body });
  }
});

// Brian's code - maybe cite
function validatePostUser(req, res, next) {
  const user = req.body;
  if (user.username && user.password) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "invalid username or password", data: user });
  }
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.login(username, password);
  if (user) {
    // maybe want to put role in the token too
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60m",
      }
    );
    setToken(token);
    logger.info(`Logged in user: ${username}`);
    res.status(200).json({ message: "you have logged in", token });
  } else {
    res.status(401).json({ message: "invalid login" });
  }
});

module.exports = router;
