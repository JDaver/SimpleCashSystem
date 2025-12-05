const Party = require("../models/party");

exports.createNewParty = async (req, res) => {
  const { nameParty } = req.body || {};
  try {
    const partyToCreate = new Party(nameParty);
    const result = await partyToCreate.createParty();
    res.status(201).json({ result });
  } catch (err) {
    console.error(`controller cathed an error -> ${err}`);
    res.status(500).json({ error: err });
  }
};

exports.updateNameParty = async (req, res) => {
  const { idParty, newNameParty } = req.body || {};
  const partyToUpdate = new Party(newNameParty);
  try {
    const result = await partyToUpdate.modifyNameParty(idParty);
    res.status(200).json(result);
  } catch (err) {
    console.error(`controller cathed an error -> ${err}`);
    res.status(500).json({ error: err });
  }
};

exports.deleteParty = async (req, res) => {
  const { idParty } = req.body || {};
  try {
    const result = await Party.deleteParty(idParty);
    res.status(200).json(result);
  } catch (err) {
    console.error(`controller cathed an error -> ${err}`);
    res.status(500).json({ error: err });
  }
};

exports.fetchParty = async (req, res) => {
  try {
    const result = await Party.fetchParty();
    res.status(200).json(result);
  } catch (err) {
    console.error(`controller cathed an error -> ${err}`);
    res.status(500).json({ error: err });
  }
};
