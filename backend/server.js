require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const ticketController = require("./controllers/ticketController");
const authMiddleware = require("./middleware/authMiddleware");
const logger = require("./util/logger");

const app = express();

// this should be moved to logger.js
// function loggerMiddleware(req, res, next) {
//   logger.info(`Incoming ${req.method} : ${req.url}`);
// }
app.use(express.json());
// app.use(loggerMiddleware());
// app.use(bodyParser.json());
// express.json() is the piece that says:
// “If the client sends JSON, automatically parse it into a JavaScript object and put it on req.body.”
// bodyParser is in curriculum, but is only for older express versions. now main functions built in

app.get("/example", (req, res) => {
  res.send("hello");
});

app.post("/example", (req, res) => {
  let data = req.body;
  console.log(data);
  res.send("posted");
});

// Public routes
app.get("/health", (req, res) => res.json({ status: "API is running" }));

// Authentication
app.post("/register", authController.register);
app.post("/login", authController.login);

// Users
app.get("/users/:username", userController.getUser);

// Tickets
app.post("/tickets/submit", ticketController.submitTicket);

// Specific filters first
app.get("/tickets/unprocessed", ticketController.getUnprocessedTickets);

// Ticket by ID
app.get("/tickets/user/:username", ticketController.getTicketsByUsername);
app.get("/tickets/:ticketId", ticketController.getTicketById);


// All tickets (general)
app.get("/tickets", ticketController.getAllTickets);

// Update ticket
app.patch("/tickets/:ticketId", ticketController.processTicket);


// Protected route
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user.sub}` });
});

// Only start server if NOT testing
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`)
  );
}

module.exports = app;
