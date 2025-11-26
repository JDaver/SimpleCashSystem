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

exports.getPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const prefs = await User.getPreferences(userId);
    res.status(200).json(prefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const newPrefs = req.body;
    const updatedPrefs = await User.updatePreferences(userId, newPrefs);
    res.status(200).json(updatedPrefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
