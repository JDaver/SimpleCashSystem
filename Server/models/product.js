const pool = require("../db/db");
const format = require("pg-format");

module.exports = class Product {
  constructor(name, price, allergens, isbeverage, isglobal) {
    this.name = name;
    this.price = price;
    this.isBeverage = isbeverage;
    this.isGlobal = isglobal;
    this.allergens = JSON.stringify(allergens);
  }

  async createProd() {
    try {
      const result = await pool.query(
        "INSERT INTO product (name, price, allergens,isbeverage,isglobal) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [this.name, this.price, this.allergens, this.isBeverage, this.isGlobal]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error from DB in createProd(): ${err.message}`);
    }
  }

  async modifyProd(id) {
    try {
      const result = await pool.query(
        `UPDATE product SET 
                name = $1,
                price = $2, 
                allergens = $3,
                isbeverage = $4,
                isglobal = $5
                where id = $6 
                RETURNING *`,
        [this.name, this.price, this.allergens, this.isBeverage, this.isGlobal, Number(id)]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error from DB in modifyProd(): ${err.message}`);
    }
  }

  static async deleteProd(product_ids) {
    try {
      const ids = Array.isArray(product_ids)
        ? product_ids.map(id => parseInt(id, 10)).filter(id => !isNaN(id))
        : [parseInt(product_ids, 10)];

      const result = await pool.query("DELETE FROM product WHERE id = ANY($1::int[]) RETURNING *", [
        ids,
      ]);
      return result.rows;
    } catch (err) {
      throw new Error(`Error from DB in deleteProd(): ${err.message}`);
    }
  }

  static async selectAllProd(filters) {
    const defaults = {
      column: "name",
      order: "DESC",
    };
    const { column, order } = {
      ...defaults,
      ...filters,
    };
    const safeOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const query = format(
      `SELECT 
                id AS product_id,
                name AS product_name,
                price AS price,
                allergens AS allergens,
                isbeverage,
                isglobal
            FROM product ORDER BY %I %s`,
      column,
      safeOrder
    );

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error("errore: ", err);
      throw new Error(`Error from DB during selectAllProd(): ${err.message}`);
    }
  }

  static async selectFilteredProd(filters = {}) {
    const defaults = {
      column: "name",
      order: "DESC",
    };
    const { isBeverage, isGlobal } = filters || {};
    const { column, order } = {
      ...defaults,
      ...filters,
    };
    const safeOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const conditions = [
      isBeverage !== undefined
        ? format("isbeverage = %L", isBeverage)
        : "isbeverage IN (true, false)",

      isGlobal !== undefined ? format("isglobal = %L", isGlobal) : "isglobal IN (true, false)",
    ];

    const query = format(
      `SELECT 
                id AS product_id,
                name AS product_name,
                price AS price,
                allergens AS allergens,
                isbeverage AS isbeverage,
                isglobal AS isglobal
            FROM product WHERE %s ORDER BY %I %s`,
      conditions.join(" AND "),
      column,
      safeOrder
    );

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error("errore: ", err);
      throw new Error(`Error from DB during selectFilteredProd(): ${err.message}`);
    }
  }
};
