const pool = require('../db/db');
const format = require('pg-format');

async function createUser(user){
    const {username, email} = user || {};

    if(!username || !email){
        return console.log( "USERNAME ED EMAIL OBBLIGATORI");
    }
    try{
        const schema_name = username + "_schema";
        const query = format('SELECT add_user(%L,%L,%L) as resultQuery',username,schema_name,email);
        const result = await pool.query(query);
        return {ok:result.rows[0].resultQuery} ;
    }catch(err){
        return {error: err.message};
    }
}