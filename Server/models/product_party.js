const format = require("pg-format");
const pool = require("../db/db");
const { deleteProduct } = require("../controllers/controllerProduct");

module.exports = class Product_party {
  constructor(product_id, relatedIDs = []) {
    this.product_id = parseInt(product_id, 10);
    this.relatedIDs = (Array.isArray(relatedIDs) ? relatedIDs : [relatedIDs]).map(id =>
      parseInt(id, 10)
    );
  }

  async createProduct_Party() {
    if (!this.relatedIDs.length) return { message: "Nessuna relazione da inserire" };

    const values = [];
    const placeholders = this.relatedIDs
      .map((party_id, i) => {
        const idx = i * 2;
        values.push(this.product_id, party_id);
        return `($${idx + 1}, $${idx + 2})`;
      })
      .join(",");

    const query = `INSERT INTO product_party (product_id, party_id) VALUES ${placeholders}`;
    try {
      const result = await pool.query(query, values);
      return result;
    } catch (err) {
      console.error("error: ", err);
      throw new Error(`Error from DB in CreateProduct_party(): ${err.message}`);
    }
  }

  async ModifyProduct_Party() {
    try {
      if (!this.relatedIDs || this.relatedIDs.length === 0) {
        await pool.query(`DELETE FROM product_party WHERE product_id = $1`, [this.product_id]);
        return { message: "Tutte le relazioni rimosse" };
      }

      await pool.query(
        `DELETE FROM product_party
                WHERE product_id = $1
                AND party_id NOT IN (${this.relatedIDs.map((_, i) => `$${i + 2}`).join(",")})`,
        [this.product_id, ...this.relatedIDs]
      );

      const values = this.relatedIDs.map(partyId => `( ${this.product_id}, ${partyId})`).join(",");
      const query = `
                INSERT INTO product_party (product_id, party_id)
                VALUES ${values}
                ON CONFLICT (product_id, party_id) DO NOTHING
                RETURNING *;`;
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw new Error(`Error from DB in ModifyProduct_party(): ${err.message}`);
    }
  }

  static async deleteProduct_party_relations(product_ids) {
    try {
      const ids = Array.isArray(product_ids)
        ? product_ids.map(id => parseInt(id, 10)).filter(id => !isNaN(id))
        : [parseInt(product_ids, 10)];

      if (ids.length === 0) return [];
      const placeholders = ids.map((_, i) => `$${i + 1}`).join(",");

      const result = await pool.query(
        `DELETE FROM product_party WHERE product_id IN (${placeholders})`,
        ids
      );
      return result.rows;
    } catch (err) {
      throw new Error(`Error drom DB in deleteProduct_party_relations() -> ${err.message} `);
    }
  }

  static async fetchProductsForParty(params, relatedIDs, orderValues) {
    const defaults = {
      column: "name",
      order: "DESC",
    };

    const { isBeverage, isGlobal } = params || {};
    const { column, order } = { ...defaults, ...orderValues };
    const safeOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const conditions = [
      format("pp.party_id in (%L)", relatedIDs),
      isBeverage !== undefined
        ? format("p.isbeverage = %L", isBeverage)
        : "p.isbeverage IN (true, false)",

      isGlobal !== undefined ? format("p.isglobal = %L", isGlobal) : "p.isglobal IN (true, false)",
    ];

    try {
      let queryConstructed = format(
        `
                    SELECT DISTINCT
                        p.id AS product_id, 
                        p.name AS product_name, 
                        p.price AS price, 
                        p.allergens AS allergens,
                        p.isglobal AS isglobal,
                        p.isbeverage As isbeverage
                    FROM product p
                    INNER JOIN product_party pp ON p.id = pp.product_id
                    WHERE %s
                    ORDER BY %I %s`,
        conditions.join(" AND "),
        column,
        safeOrder
      );
      const result = await pool.query(queryConstructed);
      return result.rows;
    } catch (err) {
      console.error("error: ", err);
      throw new Error(`Error from DB in fetchProductsForParty(): ${err.message}`);
    }
  }

  static async partiesRelatedToIDs(productIDs) {
    try {
      const partiesResult = await pool.query(
        `SELECT pp.product_id, pp.party_id, p.name_party
   FROM product_party pp
   INNER JOIN party p ON pp.party_id = p.id
   WHERE pp.product_id = ANY($1)`,
        [productIDs]
      );

      return partiesResult;
    } catch (err) {
      console.error("error: ", err);
      throw new Error(`Error from DB in partiesRelatedToIDs(): ${err.message}`);
    }
  }
};
