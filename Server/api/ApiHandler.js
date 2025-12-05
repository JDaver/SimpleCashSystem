const express = require("express");
const router = express.Router();

const productService = require("../api/apiServices/productApi");
const utils = require("../api/apiServices/utilsApi");
const receiptService = require("./apiServices/receiptApi");
const item_receipt = require("../controllers/controllerProduct_receipt");
const party = require("../controllers/controllerParty");
const user = require("../controllers/controllerUser");

//Products related Operations: DONE
router.post("/insert_item", productService.createProduct);
router.delete("/delete_item", productService.deleteProduct);
router.put("/update_item", productService.updateProduct);
router.post("/items", productService.fetchRelatedProducts);

//Receipts related op:
router.post("/create_receipt", receiptService.insertReceipt);
router.get("/collection_fetch_items", item_receipt.fetchItems);
router.get("/collection_fetch_receipts", item_receipt.fetchReceipts);

//parties related op:
router.post("/create_party", party.createNewParty);
router.put("/update_party", party.updateNameParty);
router.delete("/delete_party", party.deleteParty);
router.get("/getParties", party.fetchParty);

// user preferences
router.get("/preferences", user.getPreferences);
router.patch("/preferences", user.updatePreferences);

//parties manage

//Other stuff
router.get("/getYears", utils.getYear);
router.get("/users", user.fetchAllUsers);
module.exports = router;

/*to IMPLEMENT FEATUREs
 last 30 days for deleted items,
 JSONB on receipt ??
 Cash History  */
