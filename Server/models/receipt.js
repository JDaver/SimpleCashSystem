const pool = require('../db/db');

module.exports = class Receipt{
    constructor(total_price,date,party_ref){
        this.total_price = total_price;
        this.date = date;
        this.party_ref = party_ref;
    }

    async createReceipt(){
        /* TO DO chose a way to handle date, so check the format received from frontend and convert it in a 
        timestamp which is acceptable */
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