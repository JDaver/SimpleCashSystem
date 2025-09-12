const Product = require("../models/product");
exports.createProduct = async(product) => {
        try {
                const { product_name, price, allergens, isBeverage, isGlobal } = product;
                const prodToCreate = new Product(product_name, price, allergens, isBeverage, isGlobal);
                const result = await prodToCreate.createProd();
                console.log(result);
                res.status(201).json(result);
        }catch (err) {
                throw new Error(`product controller cathed an error -> ${err}`);
        }
}

exports.updateProduct = async (req, res) => {
        try {
                const { product_name, price, allergens,id } = req.body;
                const prodToModify = new Product(product_name, price, allergens);
                const result = await prodToModify.modifyProd(id);
                console.log(result);
                res.status(201).json(result);
        }catch (err) {
                console.error(`controller catched an error -> ${err}`)
                res.status(500).json({error: "Impossibile completare operazione di modifica del prodotto!"});
        }
}

exports.deleteProduct = async (req,res) => {
        try {
                const {id} = req.params;
                const result = await Product.deleteProd(id);
                res.status(200).json(result);
        }catch (err) {
                console.error(`controller catched an error -> ${err}`)
                res.status(500).json({error: "Impossibile completare operazione di eliminazione del prodotto!"});
        }
}

exports.fetchProducts = async (req, res) => {
        try{
        const {column, order} = req.body || {};
        const filters = {};

        if(column) filters.column = column;
        if(order) filters.order = order;

        
                const products = await Product.selectAllProd(filters);
                res.status(200).json(products);
        }catch (err) {
                console.error(`controller catched an error -> ${err}`)
                res.status(500).json({error: "Impossibile scaricare i prodotti!"});
        }
        
}


