const Product = require("../models/product");
exports.createProduct = async(req,res) => {
        const { product_name, price, allergenes } = req.body;
        const addproduct = new Product(product_name, price, allergenes);
        await addproduct.create();
        res.status(201).json(addproduct);
}

exports.updateProduct = async (req, res) => {
        const { product_name, price, allergenes,id } = req.body;
        const updateItem = new Product(product_name, price, allergenes);
        await updateItem.update(id);
        res.status(200).json(updateItem);
}

exports.deleteProduct = async (req,res) => {
        const {product_name, id} = req.body;
        const deleteItem= new Product (product_name);
        await deleteItem.delete(id);
        res.status(200).json(deleteItem);
}

exports.displayProducts = async (req, res) => {
        const products = await Product.displayAll();
        res.status(200).json(products);
}


