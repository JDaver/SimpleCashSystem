const format = require("pg-format");
const pool = require("../db/db");

module.exports = class Product_receipt {
  constructor(products = []) {
    this.products = products;
  }

  async createProduct_receipt() {
    const values = [];

    const placeholders = this.products
      .map((p, i) => {
        const idx = i * 3;
        values.push(p.id, p.receipt_id ?? null, p.quantity);
        return `($${idx + 1}, $${idx + 2}, $${idx + 3})`;
      })
      .join(",");

    const query = `INSERT INTO product_receipt (product_id, receipt_id, quantity) VALUES ${placeholders}`;

    try {
      const result = await pool.query(query, values);
      return result;
    } catch (err) {
      console.error("error: ", err);
      throw new Error(`Error from DB in CreateProduct_receipt(): ${err.message}`);
    }
  }

  static async selectItems(filters = {}) {
    const defaults = {
      date: null,
      column: "total_sell",
      order: "DESC",
      // id_party: 1,   /*TO DELETE: THIS LINE IS USED JUST FOR DEBUGGING, partyId should come from frontend */
    };
    const { date, column, order, id_party } = { ...defaults, ...filters };

    const conditions = [];

    if (date) {
      const [dateStart, dateEnd] = [`${date}-01-01`, `${date}-12-31`];
      conditions.push(format("r.date BETWEEN %L AND %L", dateStart, dateEnd));
    }

    if (id_party) {
      conditions.push(format("r.id_party = %L", id_party));
    }

    const validColumns = ["name", "total_sell"];
    const validOrders = ["ASC", "DESC"];

    try {
      if (!validColumns.includes(column)) throw new Error("Invalid sort column");
      if (!validOrders.includes(order.toUpperCase())) throw new Error("Invalid sort order");

      let queryConstructed = `
            SELECT 
                p.id,
                p.name AS name,
                COUNT(rp.product_id) AS times_in_receipts,
                SUM(rp.quantity) AS total_sell
            FROM product p
            INNER JOIN product_receipt rp ON p.id = rp.product_id
            INNER JOIN receipt r ON r.id = rp.receipt_id`;

      if (conditions.length > 0) queryConstructed += " WHERE " + conditions.join(" AND ");

      queryConstructed += format(" GROUP BY p.id, p.name ORDER BY %I %s", column, order);

      const result = await pool.query(queryConstructed);
      return result.rows;
    } catch (err) {
      console.error("error: ", err);
      throw new Error(`Error from DB in selectItems(): ${err.message}`);
    }
  }

  static async selectReceipt(filters = {}) {
    const filteredParams = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v != null) //what is this? can't remember
    );

    const defaults = {
      date: null,
      column: "receipt_date",
      order: "DESC",
      // id_party: 1,
      startingIndex: 0,
    };

    const { date, column, order, id_party, startingIndex, limit } = {
      ...defaults,
      ...filters,
    };

    const conditions = [];

    if (date > 2000) {
      //manually checking for truthness of date (to change)
      const [dateStart, dateEnd] = [`${date}-01-01`, `${date}-12-31`];
      conditions.push(format("r.date BETWEEN %L AND %L", dateStart, dateEnd));
    }

    if (id_party) {
      conditions.push(format("r.id_party = %L", id_party));
    }
    const validColumns = ["total_receipt", "receipt_date"];
    const validOrders = ["ASC", "DESC"];
    try {
      if (!validColumns.includes(column)) throw new Error("Invalid sort column");
      if (!validOrders.includes(order.toUpperCase())) throw new Error("Invalid sort order");

      let queryConstructed = `SELECT 
                        r.id AS receipt_id,
                        r.date AS receipt_date,
                        r.tot_price AS total_receipt,
                        r.cart AS items_in_receipt
                    FROM receipt r`;

      if (conditions.length > 0) queryConstructed += " WHERE " + conditions.join(" AND ");

      queryConstructed += format(
        " GROUP BY r.id, r.date, r.tot_price ORDER BY %I %s LIMIT %s OFFSET %s",
        column,
        order,
        limit,
        startingIndex
      );

      const result = await pool.query(queryConstructed);
      return result.rows;
    } catch (err) {
      console.error("error: ", err);
      throw new Error(`Error from DB in selectReceipt(): ${err.message}`);
    }
  }
};
