const Product = require("../models/product");
exports.createProduct = async(req,res) => {
    try{
        console.log("***************************:  ", req.body);
        const { product_name, price, allergenes } = req.body;
        const product = new Product(product_name, price, allergenes);
        await product.create();
        res.status(201).json(product);
    }catch(err){
        console.log("errore: ", err);
        throw new Error("Impossibile inserire il prodotto, riprovare.");
    }
}


