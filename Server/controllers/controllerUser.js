const User = require("../models/user");

exports.fetchAllUsers = async (req, res) => {
  try {
    const usersList = await User.fetchallUsers();
    res.status(200).json(usersList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createUser = async (req, res) => {
  const { username, email } = req.body || {};
  try {
    const userToCreate = new User(username, email);
    const result = await userToCreate.createUser();
    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.setPathUser = async (id, schema_name) => {
  try {
    const result = await User.changePath(id, schema_name);
    return result;
  } catch (err) {
    throw new Error(err.message || JSON.stringify(err));
  }
};
