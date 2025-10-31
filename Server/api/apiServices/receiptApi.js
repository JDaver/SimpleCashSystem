//service
const receipt = require("../../controllers/controllerReceipt");
const product_receipt = require("../../controllers/controllerProduct_receipt");

exports.insertReceipt = async (req, res) => {
  const { tot_price, date, id_party, receiptOBJ } = req.body;
  const cartItems = receiptOBJ.map((p) => ({
    name: p.name,
    quantity: p.quantity,
    price: p.price,
  }));
  const cartItemsJSON = JSON.stringify(cartItems);

  try {
    const id_receipt = await receipt.createReceipt(
      tot_price,
      date,
      id_party,
      cartItemsJSON
    );
    const result = await product_receipt.createProduct_receipt(
      receiptOBJ,
      id_receipt
    );
    res.status(201).json({ ok: result });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Errore nella creazione della ricevuta: " + err });
  }
};
