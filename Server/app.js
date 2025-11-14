// const { v4: uuidv4 } = require("uuid");
const { logInAuth } = require("./auth/logIn");
const { signInAuth } = require("./auth/signIn");
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-session"],
  })
);

app.get("/users", user.fetchAllUsers);

app.post("/auth/signin", signInAuth);
//Login Handler
app.post("/auth/login", logInAuth);

//Middleware for authentication
app.use(async (req, res, next) => {
  const tokenSession = req.headers["x-session"];

  if (!tokenSession) {
    return res.status(401).json({ error: "Token mancante" });
  }

  try {
    const { rows } = await pool.query(
      `SELECT * FROM public.app_users WHERE token = $1 AND token_expires > NOW()`,
      [tokenSession]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Sessione non valida o scaduta" });
    }

    const currentUser = rows[0];
    console.log(currentUser);
    await user.setPathUser(currentUser.id, currentUser.schema_name);
    req.user = currentUser;

    next();
  } catch (err) {
    console.error("Errore autenticazione:", err);
    res.status(500).json({ error: "Errore server durante l’autenticazione" });
  }
});

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
