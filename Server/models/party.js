const format = require("pg-format");
const pool = require("../db/db");

module.exports = class Party {
  constructor(name) {
    this.name = name;
  }

  async createParty() {
    try {
      const result = await pool.query(
        "INSERT INTO party (name_party) VALUES ($1)",
        [this.name]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error from DB in createParty(): ${err.message}`);
    }
  }

  async modifyNameParty(id) {
    try {
      const result = await pool.query(
        `UPDATE party SET
                name_party = ($1) 
                WHERE id = $2 RETRUNING *`,
        [this.name, id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error from DB in modifyNameParty(): ${err.message}`);
    }
  }

  static async deleteParty(id) {
    try {
      const result = await pool.query(
        `DELETE FROM party
                WHERE id = $1 RETRUNING *`,
        [id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error from DB in deleteParty(): ${err.message}`);
    }
  }

  static async fetchParty() {
    try {
      const result = await pool.query(
        `SELECT id AS party_id, name_party from party`
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Error from DB in fetchParty(): ${err.message}`);
    }
  }
};
