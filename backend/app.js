require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const ticketController = require("./controllers/ticketController");
const authenticateToken = require("./util/jwt");
const { loggerMiddleware } = require("./util/logger");
const { errorMiddleware } = require("./util/appError");



const app = express();
app.use(express.json());
const path = require('path'); 

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// express.json() is the piece that says:
// “If the client sends JSON, automatically parse it into a JavaScript object and put it on req.body.”
// bodyParser is in curriculum, but is only for older express versions. now main functions built in

app.use(loggerMiddleware);

app.use("/auth", authController);
app.use("/users", authenticateToken, userController);
app.use("/tickets", authenticateToken, ticketController);
// error middleware after all others
app.use(errorMiddleware);
// frontend path here
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});
app.get('/frontend/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'auth/login.html'));
});

app.use('/static', express.static(path.join(__dirname, '../frontend/js')));
// Public routes
app.get("/health", (req, res) => res.json({ status: "API is running" }));

// Protected route
app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: `Hello, ${req.user.username} with the role ${req.user.role}`,
  });
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
