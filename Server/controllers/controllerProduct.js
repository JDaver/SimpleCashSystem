const Product = require("../models/product");
exports.createProduct = async(product) => {
        try {
                const { product_name, price, allergens, isbeverage, isglobal } = product;
                const prodToCreate = new Product(product_name, price, allergens, isbeverage, isglobal);
                const result = await prodToCreate.createProd();
                return result;
        }catch (err) {
                throw new Error(`product controller cathed an error -> ${err}`);
        }
}

exports.updateProduct = async (product) => {
        try {
                const { product_name, price, allergens,id } = product || {};
                const prodToModify = new Product(product_name, price, allergens);
                const result = await prodToModify.modifyProd(id);
                console.log(result);
                return result;
        }catch (err) {
                throw new Error(`product controller cathed an error -> ${err}`);
        }
}

exports.deleteProduct = async (id) => {
        try {
                const result = await Product.deleteProd(id);
                return result;
        }catch (err) {
                throw new Error(`product controller cathed an error -> ${err}`);
        }
}

exports.fetchAllProducts = async (params) => {
        const {column, order, filterParams, valueParams} = params || {};
        const filters = {};

        try{
                if(column) filters.column = column;
                if(order) filters.order = order;
                if(filterParams) filters.filterParams = filterParams;
                if(valueParams) filters.valueParams = valueParams
        
                const products = await Product.selectAllProd(filters);
                return products;
        }catch (err) {
                console.error(`controller catched an error -> ${err}`)
                throw new Error(`product controller catched and erro -> ${err}`);
        }
        
}


