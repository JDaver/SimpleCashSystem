const pool = require("../../db/db");
const partyController = require("../../controllers/controllerParty");

exports.getYear = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT DISTINCT EXTRACT(YEAR FROM date) AS year
            FROM receipt
            ORDER BY year;`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getParty = async (req, res) => {
  try {
    const result = await partyController.fetchPartyNames();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
