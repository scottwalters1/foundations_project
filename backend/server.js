require("dotenv").config();
const express = require("express");
const userController = require("./controllers/userController");
// const authController


const app = express();
app.use(express.json());
// express.json() is the piece that says:
// “If the client sends JSON, automatically parse it into a JavaScript object and put it on req.body.”

app.get("/health", (req, res) => res.json({ status: "API is running" }));



app.post("/users", userController.createUser);
app.get("/users/:userName", userController.getUser);

// Only start server if NOT testing
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

module.exports = app;

