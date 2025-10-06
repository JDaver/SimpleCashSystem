const pool = require('../db/db');
const format = require('pg-format');

export async function changePath(user){
    const {id,schema_name} = user || {id:null};
    try{
        const resultCheckQuery = format(
        'SELECT EXISTS(SELECT 1 FROM app_users WHERE id = %L) AS user_exists',id);
        const recordExists = await pool.query(resultCheckQuery);
        if(!recordExists.rows[0].user_exists) throw new Error(" Utente inesistente");

        const newPathQuery = format('SET search_path TO %I', schema_name);
        await pool.query(newPathQuery);
        const res = await pool.query('SHOW search_path');

        if(!(res.rows[0].search_path.includes(schema_name))){
            throw new Error("Qualcosa e' andato storto");
        }
        return {ok: "Cambio utente riuscito!"};

    }catch(err) {
        return {error: err};
    }
}