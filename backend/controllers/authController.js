const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../util/jwt");

const { setToken } = require("../util/token");
const authService = require("../services/authService");

router.post(
  "/register",
  authenticateToken,
  validatePostUser,
  async (req, res, next) => {
    try {
      if (req.user.role !== "manager") {
        return res.status(403).json({ message: "Forbidden: Managers only" });
      }
      const user = await authService.register(req.body);
      res.status(201).json({ message: `Registered User ${user.username}` });
    } catch (err) {
      next(err);
    }
  }
);

function validatePostUser(req, res, next) {
  const user = req.body;
  if (user.username && user.password) {
    next();
  } else {
    res.status(400).json({ message: "invalid username or password" });
  }
}

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
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
    res.status(202).json({
      token,
      message: `Logged in ${username} as ${user.role}`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
