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

exports.fetchItems = async (req,res) => {
    try{
        const results = await Product_receipt.selectItems();

        const formattedData = results.map(row => ({
            id: row.id,
            name: row.name,
            quantity: row.total_sell,
            inHowManyReceipts: "compare in " + row.times_in_receipts + " scontrini"
        }))
        
        res.status(200).json(formattedData);
    }catch (err) {
        console.error(`controller cathced an error -> ${err}`);
        res.status(500).json({error: "Impossibile scaricare informazioni sui prodotti venduti."});
    }
}

exports.fetchReceipts = async(req,res) => {
    
        const formatDate = (date) => {
            const d = new Date(date);
            return d.toISOString().split('T')[0];
        };

    try{
        const results = await Product_receipt.selectReceipt();

        const formattedData = results.map(row => ({
            id: row.receipt_id,
            date: formatDate(row.receipt_date),
            total: row.receipt_total,
            items: row.items_in_receipt.split(',').map(item => item.trim())
        }));
        
        res.status(200).json(formattedData);
    }catch(err) {
        console.error(`controller cathced an error -> ${err}`);
        res.status(500).json({error: "Impossibile scaricare informazioni sugli scontrini."});
    }
}