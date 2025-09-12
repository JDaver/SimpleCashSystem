const express = require('express');
const router = express.Router();

const productService = require('../api/apiServices/productApi');
const item = require('../controllers/controllerProduct');
const receiptService = require('./apiServices/receiptApi');
const item_receipt = require('../controllers/controllerProduct_receipt');
const party = require('../controllers/controllerParty');

//Products related Operations:
router.post('/insert_item', productService.createProduct);
router.delete('/delete_item/:id', item.deleteProduct);
router.put('/update_item',item.updateProduct);
router.get('/items',item.fetchProducts);

//Receipts related op:
router.post('/create_receipt', receiptService.insertReceipt);
router.get('/collection_fetch_items',item_receipt.fetchItems);
router.get('/collection_fetch_receipts',item_receipt.fetchReceipts);

//parties related op:
router.post('/create_party',party.createNewParty);
router.put('/update_party',party.updateNameParty);
router.delete('/delete_party',party.deleteParty);
router.get('/fetch_partyNames',party.fetchPartyNames);

//Other stuff 
module.exports = router;


/**TODO REWIRING OF BACKEND */