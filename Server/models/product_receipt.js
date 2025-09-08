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
            console.log("error: ",err);
            throw new Error(`Error from DB in CreateProduct_rreceipt(): ${err.message}`);
        }

        
    }

    static async selectItems(){
        try{
            const result = await pool.query(`SELECT 
                            p.id,
                            p.name,
                            COUNT(rp.product_id) AS times_in_receipts,
                            SUM(rp.quantity) AS total_sell
                        FROM product p
                        INNER JOIN product_receipt rp 
                            ON p.id = rp.product_id
                        GROUP BY p.id, p.name
                        ORDER BY total_sell DESC`);
            return result.rows;
            
        }catch (err) {
            console.log("error: ",err);
            throw new Error(`Error from DB in selectItems(): ${err.message}`);
        }
    }
}