const { get } = require("../server");
const userService = require("../services/userService");

async function createUser(req, res) {
  const { userName } = req.body;
  try {
    const user = await userService.createUser(userName);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getUser(req, res) {
  const { userName } = req.params;
  try {
    const user = await userService.getUserByUsername(userName);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createUser, getUser};
