const Receipt = require("../models/receipt");

exports.createReceipt = async(tot_price,date,id_party) => {
    
    const currentReceipt = new Receipt(tot_price, date, id_party);
    const receipt_id= await currentReceipt.createReceipt();

    return receipt_id;
}