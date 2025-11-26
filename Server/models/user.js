const format = require("pg-format");
const pool = require("../db/db");

module.exports = class User {
  constructor(username, email, avatar) {
    this.username = username;
    this.email = email?.trim() || null;
    this.schema_name = `${username}_schema`;
    this.avatar = avatar;
  }

  async createUser() {
    try {
      const { rows } = await pool.query("SELECT public.add_user($1,$2,$3,$4) as resultQuery", [
        this.username,
        this.schema_name,
        this.email ?? null,
        this.avatar,
      ]);

      const result = rows[0].resultquery;
      const userObj = typeof result === "string" ? JSON.parse(result) : result;

      console.log("???", userObj);

      return userObj;
    } catch (err) {
      console.error("Errore in createUser:", err);
      throw err;
    }
  }

  async updateUser(oldUsername) {
    try {
      const query = format(
        "SELECT update_user (%L,%L,%L,%L,%L) as resultQuery",
        oldUsername,
        this.username,
        this.schema_name,
        this.email,
        this.avatar
      );
      const result = await pool.query(query);
      return { ok: result.rows[0].resultQuery };
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(username) {
    try {
      const query = format("SELECT remove_user (%L) AS resultQuery ", username);
      const result = await pool.query(query);
      return { ok: result.rows[0].resultQuery };
    } catch (err) {
      throw err;
    }
  }

  static async changePath(id, schema_name) {
    try {
      const resultCheckQuery = format(
        "SELECT EXISTS(SELECT 1 FROM public.app_users WHERE id = %L) AS user_exists",
        id
      );
      const recordExists = await pool.query(resultCheckQuery);
      if (!recordExists.rows[0].user_exists) throw new Error(" Utente inesistente");

      const newPathQuery = format("SET search_path TO %I", schema_name);
      await pool.query(newPathQuery);
      const res = await pool.query("SHOW search_path");

      if (!res.rows[0].search_path.includes(schema_name)) {
        throw new Error("Qualcosa e' andato storto");
      }
      return { ok: "Cambio utente riuscito!" };
    } catch (err) {
      throw err;
    }
  }

  static async fetchallUsers() {
    try {
      const query = "SELECT * FROM public.app_users";
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  static async getPreferences(userId) {
    try {
      const query = "SELECT preferences FROM public.app_users WHERE id = $1";
      const result = await pool.query(query, [userId]);
      return result.rows[0]?.preferences || {};
    } catch (err) {
      throw err;
    }
  }

  static async updatePreferences(userId, newPrefs) {
    try {
      const query = `
      UPDATE public.app_users
      SET preferences = COALESCE(preferences, '{}'::jsonb) || $1::jsonb
      WHERE id = $2
      RETURNING preferences
    `;
      const result = await pool.query(query, [newPrefs, userId]);
      return result.rows[0].preferences;
    } catch (err) {
      throw err;
    }
  }
};
