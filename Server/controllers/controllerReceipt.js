const Receipt = require("../models/receipt");

exports.createReceipt = async(tot_price,date,id_party) => {
    try{
        const receiptToCreate = new Receipt(tot_price, date, id_party);
        const receipt_id= await receiptToCreate.createReceipt();
        return receipt_id;
    }catch(err){
        console.error(`controller cathced an error -> ${err}`);
        return err;
    }
}