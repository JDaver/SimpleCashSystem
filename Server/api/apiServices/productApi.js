const productController = require("../../controllers/controllerProduct");
const product_partyController = require("../../controllers/controllerProduct_party");
const Product_party = require("../../models/product_party");
const partyController = require("../../controllers/controllerParty");
const { groupingPartiesBuilder } = require("../../utils/utilsFunctions");

exports.createProduct = async (req, res) => {
  const { product } = req.body || {};
  let { partyIDs = [], ...productData } = product || {};
  partyIDs = Array.isArray(partyIDs) ? partyIDs : [partyIDs];
  let relationRes = "nessuna relazione con feste";
  try {
    const productRes = await productController.createProduct(productData);

    if (Array.isArray(partyIDs) && partyIDs.length > 0) {
      const product_id = productRes.id;
      relationRes = await product_partyController.createProduct_party(
        product_id,
        partyIDs
      );
    }

    res.status(201).json({
      product: productRes,
      relations: relationRes,
    });
  } catch (err) {
    console.error(`product api catched an error -> ${err}`);
    res.status(500).json({
      error: "Impossibile completare operazione di creazione del prodotto!",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { product } = req.body || {};
  let { partyIDs = [], ...productData } = product || {};
  let relationRes = "Relazioni con feste non modificate";

  try {
    const productRes = await productController.updateProduct(productData);
    console.log(productRes);
    const product_id = productRes.id;
    if (productRes.isglobal === true) {
      relationRes = await product_partyController.modifyProduct_party(
        product_id,
        []
      );
    } else {
      if (!partyIDs || partyIDs.length === 0) {
        return res.status(400).json({
          error:
            "Un prodotto non globale deve avere almeno una festa associata",
        });
      }
      relationRes = await product_partyController.modifyProduct_party(
        product_id,
        partyIDs
      );
    }

    res.status(200).json({
      product: productRes,
      relations: relationRes,
    });
  } catch (err) {
    console.error(`product api catched an error -> ${err}`);
    res.status(500).json({
      error: "Impossibile completare operazione di modfica del prodotto!",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { product_id } = req.params || {};
  console.log(product_id);
  try {
    await Product_party.deleteProduct_party_relations(product_id);
    const result = await productController.deleteProduct(product_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.fetchRelatedProducts = async (req, res) => {
  const { partyIDs, orderValues, params } = req.body;

  let results = [];

  try {
    if (Array.isArray(partyIDs) && partyIDs.length > 0) {
      results = await Product_party.fetchProductsForParty(
        params,
        partyIDs,
        orderValues
      );
    } else if (params && Object.keys(params).length > 0) {
      results = await productController.fetchFilteredProducts(
        params,
        orderValues
      );
    } else {
      results = await productController.fetchAllProducts(orderValues);
      console.log(results);
    }

    const productIDs = results.map((r) => r.product_id);

    const partiesResult = await Product_party.partiesRelatedToIDs(productIDs);
    const partiesMap = groupingPartiesBuilder(partiesResult);

    const formattedData = results.map((row) => ({
      id: row.product_id,
      name: row.product_name,
      price: row.price,
      allergens: row.allergens,
      isGlobal: row.isglobal,
      isBeverage: row.isbeverage,
      parties: partiesMap[row.product_id] || [],
    }));

    res.status(200).json({ formattedData });
  } catch (err) {
    console.error(`controller cathced an error -> ${err}`);
    res
      .status(500)
      .json({ error: "Impossibile scaricare informazioni sugli articoli." });
  }
};
