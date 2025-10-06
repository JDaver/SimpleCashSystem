const Product = require("../models/product");
exports.createProduct = async (product) => {
  try {
    const { product_name, price, allergens, isbeverage, isglobal } = product;
    const prodToCreate = new Product(
      product_name,
      price,
      allergens,
      isbeverage,
      isglobal
    );
    const result = await prodToCreate.createProd();
    return result;
  } catch (err) {
    throw new Error(`product controller cathed an error -> ${err}`);
  }
};

exports.updateProduct = async (product) => {
  try {
    const { product_name, price, allergens, id, isbeverage, isglobal } =
      product || {};

    const prodToModify = new Product(
      product_name,
      price,
      allergens,
      isbeverage,
      isglobal
    );
    const result = await prodToModify.modifyProd(id);

    return result;
  } catch (err) {
    throw new Error(`product controller cathed an error -> ${err}`);
  }
};

exports.deleteProduct = async (product_ids) => {
  const ids = Array.isArray(product_ids) ? product_ids : [product_ids];

  try {
    const result = await Product.deleteProd(ids);
    return result;
  } catch (err) {
    throw new Error(`product controller cathed an error -> ${err}`);
  }
};

exports.fetchFilteredProducts = async (params, orderValues) => {
  const { column, order } = orderValues || {};
  const { isBeverage, isGlobal } = params || {};
  const filters = {};

  try {
    if (column) filters.column = column;
    if (order) filters.order = order;
    if (isBeverage !== undefined) filters.isBeverage = isBeverage;
    if (isGlobal !== undefined) filters.isGlobal = isGlobal;

    const products = await Product.selectFilteredProd(filters);
    return products;
  } catch (err) {
    console.error(`controller catched an error -> ${err}`);
    throw new Error(`product controller catched and erro -> ${err}`);
  }
};

exports.fetchAllProducts = async (orderValues) => {
  const { column, order } = orderValues || {};
  const filters = {};
  try {
    if (column) filters.column = column;
    if (order) filters.order = order;
    const products = await Product.selectAllProd(filters);
    return products;
  } catch (err) {
    console.error(`controller catched an error -> ${err}`);
    throw new Error(`product controller catched and erro -> ${err}`);
  }
};
