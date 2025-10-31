const pool = require("../db/db");

module.exports = class Receipt {
  constructor(total_price, date, party_ref, JSONItems) {
    this.total_price = parseFloat(total_price);
    this.date = new Date(date);
    this.party_ref = party_ref ? parseInt(party_ref, 10) : null;
    this.JSONItems = JSONItems ?? null;
  }

  async createReceipt() {
    try {
      const result = await pool.query(
        "INSERT INTO receipt (tot_price, date, id_party, cart) VALUES ($1, $2, $3, $4) RETURNING id",
        [this.total_price, this.date, this.party_ref, this.JSONItems]
      );
      return result.rows[0].id;
    } catch (err) {
      throw new Error(`Error from DB in CreateReceipt(): ${err.message}`);
    }
  }

  async deleteReceipt() {
    //TO DO deleteReceipt()
  }

  static async selectAllReceipt() {
    //TO DO selectAllReceipt()
  }

  async selectFromParty() {
    //TO DO
  }

  async selectFromDate() {
    //TO DO
  }
};
