// const { v4: uuidv4 } = require("uuid");
const { logInAuth } = require("./auth/logIn");
const { signInAuth } = require("./auth/signIn");
const { authMidlleware } = require("./auth/authMiddleware");
const user = require("./controllers/controllerUser");
const express = require("express");
const path = require("path");
const app = express();
const pool = require("./db/db");
const apiCall = require("./api/ApiHandler");
const cors = require("cors");
const reactPath = path.join(__dirname, "..", "Views", "dist");
app.use(express.static(reactPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-session"],
  })
);

app.get("/users", user.fetchAllUsers);

app.post("/auth/signin", signInAuth);
//Login Handler
app.post("/auth/login", logInAuth);

//Middleware for authentication
app.use((req, res, next) => authMidlleware(req, res, next));

//API handler middleware
app.use("/api", apiCall);

//Main route handler
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

app.listen(4444, () => {
  console.log("Listening on http://localhost:4444/Main");
});

// DB connection check
app.get(/.*/, async (req, res, next) => {
  try {
    const jsontest = await pool.query("SELECT NOW()");
    console.log("DataBase connection: " + jsontest.rows[0].now);
  } catch (err) {
    console.log("errore " + err.message);
  }
  next();
});
