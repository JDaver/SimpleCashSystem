const Receipt = require("../models/receipt");

exports.createReceipt = async (tot_price, date, id_party, items) => {
  try {
    const receiptToCreate = new Receipt(tot_price, date, id_party, items);
    const receipt_id = await receiptToCreate.createReceipt();
    return receipt_id;
  } catch (err) {
    console.error(`controller cathced an error -> ${err}`);
    throw new Error(err);
  }
};
