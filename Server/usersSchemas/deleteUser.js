const pool = require('../db/db');
const format = require('pg-format');

async function deleteUser(username){
    try{
        const query = format('SELECT remove_user (%L) AS resultQuery ',username);
        const result = await pool.query(query);
        return {ok: result.rows[0].resultQuery};
    }catch(err) {
        return {error: err};
    }
}