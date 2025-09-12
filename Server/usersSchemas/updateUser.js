const pool = require('../db/db');
const format = require('pg-format');

export async function updateUser(old_username, new_username, new_schema_name, new_email){
    try{
        const query = format(
            'SELECT update_user (%L,%L,%L,%L) as resultQuery',
            old_username,new_username,new_schema_name,new_email);
            const result = await pool.query(query)
            return {ok: result.rows[0].resultQuery};
    }catch(err) {
        return {error: err};
    }
}