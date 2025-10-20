const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

async function signInAuth(req, res) {
  const { new_username, new_email, new_avatar } = req.body || {};
  try {
    const userToCreate = new User(new_username, new_email, new_avatar);
    const result = await userToCreate.createUser();

    if (!result) {
      return res
        .status(500)
        .json({ error: "createUser non ha restituito alcun valore" });
    }

    const { username, email, token, token_expires, avatar } = result;
    console.log(
      "valori della session: ",
      token,
      token_expires,
      username,
      avatar
    );

    res.status(201).json({
      username,
      currentEmail: email,
      currentToken: token,
      expiresAt: token_expires,
      avatar,
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: err.message,
        name: err.name,
        stack: err.stack,
        ...err,
      },
    });
  }
}

module.exports = { signInAuth };
