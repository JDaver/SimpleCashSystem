const pool = require ('../db/db');
const format = require("pg-format");


module.exports = class Product {
    
    constructor(name,price,allergens,isBeverage,isGloabal){
        this.name = name;
        this.price = price;
        this.isBeverage = isBeverage;
        this.isGlobal = isGloabal;
        this.allergens = JSON.stringify(allergens);
    }

    async createProd(){
        try{
            const result = await pool.query(
                'INSERT INTO product (name, price, allergens,isBeverage,isGlobal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [this.name, this.price, this.allergens,this.isBeverage,this.isGloabal]
            );
            return result.rows[0];

        }catch(err){
            throw new Error(`Error from DB in createProd(): ${err.message}`);
        }
    }

    async modifyProd(id){
        try{
            const result = await pool.query(
                `UPDATE product SET 
                name = $1,
                price = $2, 
                allergens = $3,
                isBeverage = $4,
                isGlobal = $5
                where id = $6 RETURNING *`,
                [this.name, this.price, this.allergens, this.isBeverage, this.isGlobal, id]
            )
            return result.rows[0];
        }catch(err){
            throw new Error(`Error from DB in modifyProd(): ${err.message}`);
        }
    }

    static async deleteProd(id){
        try{
            const result = await pool.query(
            'DELETE FROM product WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        }catch(err){
            throw new Error(`Error from DB in deleteProd(): ${err.message}`);
        }
    }

    static async selectAllProd(filters = {} ){

        const defaults = {
            column: "name",
            order: "DESC",
            filteredParams: "isBeverage",
            valueParams:false
        }
        const {column, order, filteredParams, valueParams} = {...defaults, ...filters};
        safeOrder = order.toUpperCase() === "ASC" ? "ASC" : "DES";

        const query = format("SELECT * FROM product WHERE %I = %L ORDER BY %I %s",
            filteredParams, valueParams, column, safeOrder);
    
        try{
            const result = await pool.query(query);
            return result.rows;
        }catch(err){
            console.log("errore: ",err)
            throw new Error(`Error from DB during selectAllProd(): ${err.message}`);
        }
    }
}

