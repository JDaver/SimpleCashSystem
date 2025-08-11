const pool = require ('../db/db');

module.exports = class Product {
    constructor(name,price,allergens){
        this.name = name;
        this.price =  price;
        this.allergens = JSON.stringify(allergens);
;
    }

    async create(){
        try{
            console.log(typeof(this.price));
            await pool.query(
                'INSERT INTO product (name, price, allergens) VALUES ($1, $2, $3)',
                [this.name, this.price, this.allergens]
            );
            return [this.name, this.price];

        }catch(err){
            console.log("errore: ", err);
            throw new Error("Impossibile inserire il prodotto, riprovare.");
        }
    }
}
