const pool = require("../db/db");
const user = require("../controllers/controllerUser");

async function authMidlleware(req, res, next) {
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

    await user.setPathUser(currentUser.id, currentUser.schema_name);
    req.user = currentUser;

    next();
  } catch (err) {
    console.error("Errore autenticazione:", err);
    res.status(500).json({ error: "Errore server durante l’autenticazione" });
  }
}

module.exports = { authMidlleware };
