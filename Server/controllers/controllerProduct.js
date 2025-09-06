const Product = require("../models/product");
exports.createProduct = async(req,res) => {
        try {
                const { product_name, price, allergens } = req.body;
                const prodToCreate = new Product(product_name, price, allergens);
                result = await prodToCreate.createProd();
                console.log(result);
                res.status(201).json(result);
        }catch (err) {
                console.error(`controller catched an error -> ${err}`)
                res.status(500).json({error: "Impossibile completare operazione di creazione del prodotto!"});
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
                const id = req.body;
                const result = await deleteProd(id);
                res.status(200).json(result);
        }catch (err) {
                console.error(`controller catched an error -> ${err}`)
                res.status(500).json({error: "Impossibile completare operazione di eliminazione del prodotto!"});
        }
}

exports.displayProducts = async (req, res) => {
        try{
                const products = await Product.selectAllProd();
                res.status(200).json(products);
        }catch (err) {
                console.error(`controller catched an error -> ${err}`)
                res.status(500).json({error: "Impossibile scaricare i prodotti!"});
        }
        
}


