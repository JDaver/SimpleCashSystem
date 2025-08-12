const pool = require ('../db/db');

module.exports = class Product {
    constructor(name,price,allergens){
        this.name = name;
        this.price =  price;
        this.allergens = JSON.stringify(allergens);
    }

    async create(){
        try{
            await pool.query(
                'INSERT INTO product (name, price, allergens) VALUES ($1, $2, $3)',
                [this.name, this.price, this.allergens]
            );
            return {name : this.name, price: this.price};

        }catch(err){
            console.log("errore: ", err);
            throw new Error("Impossibile inserire il prodotto, riprovare.");
        }
    }

    async modify(id){
        try{
            await pool.query(
                "UPDATE product SET name = $1, price = $2, allergens = $3 where id = $4",
                [this.name, this.price, this.allergens, id]
            )
            return this.name;
        }catch(err){
            console.log("errore: ", err);
            throw new Error("Impossibile inserire il prodotto, riprovare.");
        }
    }

    async delete(id){
        try{
            await pool.query('DELETE FROM product WHERE id = $1', id);
            return this.name;
        }catch(err){
            console.log("errore: ", err);
            throw new Error("Impossibile eliminare il prodotto, riprovare.");
        }
    }

    static async displayAll(){
        try{
            const result = await pool.query("SELECT * FROM product");
            return result.rows;
            /*
            return result.rows.map(row => ({
                id: row.id,
                name: row.name,
                price: row.price,
                allergens: row.allergens ? JSON.parse(row.allergens) : []
            }));*/
        }catch(err){
            console.log("errore: ",err)
            throw new Error("Impossibile scaricare i prodotti, riprovare.");
        }
    }
}

