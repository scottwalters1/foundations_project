require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const ticketController = require("./controllers/ticketController");
const authenticateToken = require("./util/jwt");
const logger = require("./util/logger");

const app = express();
app.use(express.json());

// this should be moved to logger.js
// function loggerMiddleware(req, res, next) {
//   logger.info(`Incoming ${req.method} : ${req.url}`);
// }

// app.use(loggerMiddleware());
// app.use(bodyParser.json());
// express.json() is the piece that says:
// “If the client sends JSON, automatically parse it into a JavaScript object and put it on req.body.”
// bodyParser is in curriculum, but is only for older express versions. now main functions built in

app.use("/users", userController);
app.use("/tickets", ticketController);
app.use("/auth", authController);

// Public routes
app.get("/health", (req, res) => res.json({ status: "API is running" }));

// // Authentication
// app.post("/register", authController.register);
// app.post("/login", authController.login);

// Protected route
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}` });
  console.log(req.user);
});

// Only start server if NOT testing
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`)
  );
}

module.exports = app;
