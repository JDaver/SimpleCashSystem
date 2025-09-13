const Product_party = require('../models/product_party');

exports.createProduct_party = async (product_id,partyIDs) => {
    try{
        const relationToCreate = new Product_party(product_id,partyIDs);
        const result = await relationToCreate.createProduct_Party();
        return result;
    }catch(err){
        throw new Error(`relation Product_party controller cathced an error -> ${err}`)
    }
}

exports.modifyProduct_party = async (product_id, partyIDs) => {  
    try{
        const relationToUpdate = new Product_party(product_id,partyIDs);
        const result = await relationToUpdate.ModifyProduct_Party();
        return result;
    }catch(err){
        throw new Error(`product_party controller cathed an error -> ${err}`);
    }
}

