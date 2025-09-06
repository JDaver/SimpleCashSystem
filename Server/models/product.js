const pool = require ('../db/db');

module.exports = class Product {
    constructor(name,price,allergens){
        this.name = name;
        this.price = price;
        this.allergens = JSON.stringify(allergens);
    }

    async createProd(){
        try{
            const result = await pool.query(
                'INSERT INTO product (name, price, allergens) VALUES ($1, $2, $3) RETURNING *',
                [this.name, this.price, this.allergens]
            );
            return result.rows[0];

        }catch(err){
            throw new Error(`Error from DB in createProd(): ${err.message}`);
        }
    }

    async modifyProd(id){
        try{
            const result = await pool.query(
                "UPDATE product SET name = $1, price = $2, allergens = $3 where id = $4 RETURNING *",
                [this.name, this.price, this.allergens, id]
            )
            return result.rows[0];
        }catch(err){
            throw new Error(`Error from DB in modifyProd(): ${err.message}`);
        }
    }

    static async deleteProd(id){
        try{
            const result = await pool.query('DELETE FROM product WHERE id = $1 RETURNING *', id);
            return result.rows[0];
        }catch(err){
            throw new Error(`Error from DB in deleteProd(): ${err.message}`);
        }
    }

    static async selectAllProd(){
        try{
            const result = await pool.query("SELECT * FROM product");
            return result.rows;
        }catch(err){
            console.log("errore: ",err)
            throw new Error(`Error from DB during selectAllProd(): ${err.message}`);
        }
    }
}

