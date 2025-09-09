require("dotenv").config();
const express = require("express");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const ticketController = require("./controllers/ticketController");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
// express.json() is the piece that says:
// “If the client sends JSON, automatically parse it into a JavaScript object and put it on req.body.”



// Public routes
app.get("/health", (req, res) => res.json({ status: "API is running" }));

// Authentication
app.post("/register", authController.register);
app.post("/login", authController.login);

// Users
app.get("/users/:username", userController.getUser);

// Tickets
app.post("/tickets/submit", ticketController.submitTicket);
app.get("/tickets/:ticketId", ticketController.getTicketById);
app.get("/tickets", ticketController.getAllTickets);
app.get("/tickets/unprocessed", ticketController.getUnprocessedTickets);
app.get("/tickets/:username", ticketController.getTicketsByUsername);
app.patch("/tickets/:ticketId", ticketController.processTicket);


// Next: 
// todo comments in ticketService

// Protected route
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user.sub}` });
});



// Only start server if NOT testing
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

module.exports = app;

