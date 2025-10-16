const pool = require("../db/db");
const format = require("pg-format");

export async function selectUsers() {
  try {
    const query = "SELECT * FROM app_users";
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    return { error: err };
  }
}
