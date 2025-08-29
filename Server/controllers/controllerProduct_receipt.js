const Product_receipt = require('../models/product_receipt');

exports.createProduct_receipt = async (receiptOBJ, receipt_id) => {
    
    const products = receiptOBJ.map(p => ({...p, receipt_id: receipt_id}));
    console.log(products);
    const currentProd_receipt = new Product_receipt(products);

    const result = await currentProd_receipt.createProduct_receipt();
    return result;
}   