const Product = require("../models/product");
exports.createProduct = async(req,res) => {
        const { product_name, price, allergens } = req.body;
        if(product_name=== "") return;//prevent empty object (behaviour to fix)
        const currentProd = new Product(product_name, price, allergens);
        await currentProd.createProd();
        res.status(201).json(currentProd);
}

exports.updateProduct = async (req, res) => {
        const { product_name, price, allergens,id } = req.body;
        const currentProd = new Product(product_name, price, allergens);
        await currentProd.modifyProd(id);
        res.status(200).json(currentProd);
}

exports.deleteProduct = async (req,res) => {
        const {product_name, id} = req.body;
        const currentProd= new Product (product_name);
        await currentProd.deleteProd(id);
        res.status(200).json(currentProd);
}

exports.displayProducts = async (req, res) => {
        const products = await Product.selectAllProd();
        res.status(200).json(products);
}


