const Party = require('../models/party');

exports.createNewParty = async(req,res) => {
    const nameParty = req.body || {};
    try{
        const partyToCreate = new Party(nameParty);
        const result = await partyToCreate.createParty();
        res.status(201).json(result);
    }catch(err) {
        console.error(`controller cathed an error -> ${err}`);
        res.status(500).json({error: err})
    }
}

exports.updateNameParty = async(req,res) => {
    const {id, nameParty} = req.body || {};
    const partyToUpdate = new Party(nameParty);
    try{
        const result = await partyToUpdate.modifyNameParty(id);
        res.status(200).json(result);
    }catch(err) {
        console.error(`controller cathed an error -> ${err}`);
        res.status(500).json({error: err});
    }
}

exports.deleteParty = async (req,res) => {
    const id = req.body || {};
    try{
        const result = await Party.deleteParty(id);
        res.status(200).json(result);
    }catch(err) {
        console.error(`controller cathed an error -> ${err}`);
        res.status(500).json({error: err});
    }
}

exports.fetchPartyNames = async (req,res) => {
    try{
        const result = await Party.fetchParty();
        res.status(200).json(result);
    }catch(err) {
        console.error(`controller cathed an error -> ${err}`);
        res.status(500).json({error: err});
    }
}