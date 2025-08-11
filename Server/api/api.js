const express = require('express');
const router = express.Router();

const item = require('../controllers/controllerItem');
//const deleteItem = require('../controllers/deleteItem');

router.post('/insert_item', item.createProduct);
//router.delete('/item/:id', deleteItem);

module.exports = router;
