const pool = require('../../db/db');

exports.getYear = async (req,res) => {
    try{
        const result = await pool.query(`
            SELECT DISTINCT EXTRACT(YEAR FROM date) AS year
            FROM receipt
            ORDER BY year;`);
        console.log(result);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({error: err});
    }
}