const pool = require('../db/db');

module.exports = class Receipt{
    constructor(total_price,date,party_ref){
        this.total_price = parseFloat(total_price);
        this.date = new Date(date);
        this.party_ref = parseInt(party_ref,10);
    }

    async createReceipt(){
        try{
            const result = await pool.query(
                'INSERT INTO receipt (tot_price, date, id_party) VALUES ($1, $2, $3) RETURNING id',
                [this.total_price, this.date, this.party_ref]
            );
            return result.rows[0].id;
        }catch(err){
            console.log("errore: ", err);
            throw new Error("Impossibile inserire il prodotto, riprovare.");
        }
        
    }

    async deleteReceipt(){
        //TO DO deleteReceipt()
    }

    static async selectAllReceipt(){
        //TO DO selectAllReceipt()
    }

    async selectFromParty(){
        //TO DO 
    }

    async selectFromDate(){
        //TO DO
    }

}