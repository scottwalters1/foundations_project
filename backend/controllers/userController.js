const express = require('express');
const router = express.Router();

const userService = require("../services/userService");

// get user by username
router.get("/:username", async (req, res) => {
  const user = await userService.getUserByUsername(req.params);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({message: "User not found"});
  }
});

module.exports = router;
