const Receipt = require("../models/receipt");

exports.createReceipt = async(req,res) => {
    const { tot_price, date, id_party} = req.body;
    const currentReceipt = new Receipt(tot_price, date, id_party);

    await currentReceipt.createReceipt();
    res.status(201).json(currentReceipt);
    
}


/*{"id_party":"test","tot_price":"14",
"receipt":[{"id":57,"name":"ABC","price":"12","quantity":1},{"id":58,"name":"KLM","price":"2","quantity":1}],"date":1756398680032}
*/
