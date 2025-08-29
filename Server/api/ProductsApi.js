const express = require('express');
const router = express.Router();

const item = require('../controllers/controllerProduct');
const createReceipt = require('./apiServices/createReceipt');

//const deleteItem = require('../controllers/deleteItem');

//Products related Operations:
router.post('/insert_item', item.createProduct);
router.delete('/delete_item/:id', item.deleteProduct);
router.put('update_item/:id',item.updateProduct);
router.get('/items',item.displayProducts);

//Receipts related op:
router.post('/create_receipt',createReceipt.insertReceipt);

//Other stuff 
module.exports = router;
