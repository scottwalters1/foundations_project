const authService = require("../services/authService");

async function register(req, res) {
  try {
    const { username, password } = req.body;
    const result = await authService.register(username, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { register, login };
