const Product_receipt = require('../models/product_receipt');

exports.createProduct_receipt = async (receiptOBJ, receipt_id) => {
    try{
        const products = receiptOBJ.map(p => ({...p, receipt_id: receipt_id}));
        const prod_receiptToCreate = new Product_receipt(products);
         const result = await prod_receiptToCreate.createProduct_receipt();
        return result;
    }catch (err){
        console.error(`controller cathced an error -> ${err}`);
        return err;
    } 
    

   
}   