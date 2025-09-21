const express = require('express');
const router = express.Router();

const productService = require('../api/apiServices/productApi');
const utils = require('../api/apiServices/utilsApi');
const receiptService = require('./apiServices/receiptApi');
const item_receipt = require('../controllers/controllerProduct_receipt');
const party = require('../controllers/controllerParty');

//Products related Operations: DONE
router.post('/insert_item', productService.createProduct);
router.delete('/delete_item', productService.deleteProduct);
router.put('/update_item',productService.updateProduct);
router.get('/items',productService.fetchRelatedProducts);

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
router.get('/getYears',utils.getYear);
router.get('/getPartys',party.fetchPartyNames);
module.exports = router;


/**TODO REWIRING OF BACKEND */