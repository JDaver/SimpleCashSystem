const express = require('express');
const router = express.Router();

const item = require('../controllers/controllerProduct');
const receiptService = require('./apiServices/receiptApi');
const item_receipt = require('../controllers/controllerProduct_receipt');

//const deleteItem = require('../controllers/deleteItem');

//Products related Operations:
router.post('/insert_item', item.createProduct);
router.delete('/delete_item/:id', item.deleteProduct);
router.put('update_item/',item.updateProduct);
router.get('/items',item.fetchProducts);

//Receipts related op:
router.post('/create_receipt', receiptService.insertReceipt);
router.get('/collection_fetch_items',item_receipt.fetchItems);
router.get('/collection_fetch_receipts',item_receipt.fetchReceipts);

//Other stuff 
module.exports = router;
