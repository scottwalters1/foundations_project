const authService = require("../services/authService");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = authService.verifyToken(token);
    req.user = user; // attach decoded JWT payload
    next();
  } catch (err) {
    res.sendStatus(403); // invalid/expired
  }
}

module.exports = authMiddleware;
