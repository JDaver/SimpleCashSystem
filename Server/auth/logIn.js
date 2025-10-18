const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db");

async function logInAuth(req, res) {
  const { username } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM public.app_users WHERE username = $1",
      [username]
    );
    if (!user.rows.length)
      return res.status(401).json({ error: "Utente non trovato" });
    const row = user.rows[0];
    const token = uuidv4();
    const expires = new Date(Date.now() + 16 * 60 * 60 * 1000);

    await pool.query(
      "UPDATE public.app_users SET token=$1, token_expires=$2 WHERE id=$3",
      [token, expires, user.rows[0].id]
    );

    res.json({
      username: row.username,
      currentEmail: row.email,
      currentToken: token,
      expiresAt: expires,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

module.exports = { logInAuth };
