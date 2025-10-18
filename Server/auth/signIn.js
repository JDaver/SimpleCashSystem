const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

async function signInAuth(req, res) {
  const { new_username, new_email } = req.body || {};
  try {
    const userToCreate = new User(new_username, new_email);
    const result = await userToCreate.createUser();

    if (!result) {
      return res
        .status(500)
        .json({ error: "createUser non ha restituito alcun valore" });
    }

    const { username, email, token, token_expires } = result;
    console.log("valori della session: ", token, token_expires, username);

    res.status(201).json({
      username,
      currentEmail: email,
      currentToken: token,
      expiresAt: token_expires,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
        ...err, // opzionale, se vuoi altre proprietà
      },
    });
  }
}

module.exports = { signInAuth };
