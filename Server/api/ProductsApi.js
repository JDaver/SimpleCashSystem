const express = require('express');
const router = express.Router();

const item = require('../controllers/controllerProduct');


//const deleteItem = require('../controllers/deleteItem');

//Products related Operations:
router.post('/insert_item', item.createProduct);
router.delete('/delete_item/:id', item.deleteProduct);
router.put('update_item/:id',item.updateProduct);
router.get('/items',item.displayProducts);

//Other stuff 
module.exports = router;
