const pool = require('../db/db')

module.exports = class Product_receipt{
    constructor(products = []){
        this.products = products;
    }

    async createProduct_receipt(){
        const values = [];

        const placeholders = this.products.map((p,i) => {
            const idx = i * 3;
            values.push(p.id, p.receipt_id, p.quantity);
            return `($${idx+1}, $${idx+2}, $${idx+3})`;
        }).join(',');

        const query = `INSERT INTO product_receipt (product_id, receipt_id, quantity) VALUES ${placeholders}`;

        try{
            const result = await pool.query(query,values);
            console.log("reslt+ "+result)
            return result;
        }catch(err){
            console.log("errore: ",err);
            throw new Error("Errore nell'inserimento della tabella di relazione 'product_receipt'.");
        }

        
    }
}