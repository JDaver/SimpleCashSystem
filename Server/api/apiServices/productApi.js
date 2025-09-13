const productController = require('../../controllers/controllerProduct');
const product_partyController  = require('../../controllers/controllerProduct_party');
const Product_party = require('../../models/product_party');


exports.createProduct = async(req,res) => {
    const {product = {}, partyIDs = []} = req.body || {};
    let relationRes = "nessuna relazione con feste";

    try{
        const productRes = await productController.createProduct(product);
        
        if(Array.isArray(partyIDs) && partyIDs.length > 0){
            const product_id = productRes.rows[0].id;
            relationRes = await product_partyController.createProduct_party(product_id, partyIDs);
        }

        res.status(201).json({
            product: productRes,
            relations: relationRes
        });

    }catch(err){
        console.error(`product api catched an error -> ${err}`)
        res.status(500).json({error: "Impossibile completare operazione di creazione del prodotto!"});
    }
}

exports.updateProduct = async (req,res) => {
    const {product, partyIDs} = req.body || {};
    let relationRes = "Relazioni con feste non modificate";

    try{
        const productRes = await productController.updateProduct(product);

        if(Array,isArray(partyIDs)){
            const product_id = productRes.rows[0].id;
            relationRes = await product_partyController.modifyProduct_party(product_id,partyIDs);
        }
    res.status(200).json({
        product: productRes,
        relations: relationRes
    });
    }catch(err) {
         console.error(`product api catched an error -> ${err}`)
        res.status(500).json({error: "Impossibile completare operazione di modfica del prodotto!"});
    }
    }

exports.deleteProduct = async (req,res) => {
    const {product_id} = req.body || {};
    try{
        await Product_party.deleteProduct_party_relations(product_id);
        const result = await productController.deleteProduct(product_id);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({error: err});
    }
}

exports.fetchRelatedProducts = async (req,res) => {
    const{params,partyIds} = req.params || {};
    let results = [];
    const parsedPartyIds = Array.isArray(partyIds) ? partyIds : (partyIds ? partyIds.split(',') : []);

    try{
        if(Array.isArray(parsedPartyIds) && parsedPartyIds > 0){
            results = await Product_party.fetchProductsForParty(params, parsedPartyIds);
        }else{
            results = await productController.fetchAllProducts(params); 
        }
        const formattedData = results.map(row => ({
            id: row.product_id,
            name: row.product_name,
            price: row.price,
            allergens: row.allergens.split(',').map(allergen => allergen.trim())
        }));

        res.status(200).json(formattedData);
    }catch(err) {
        console.error(`controller cathced an error -> ${err}`);
        res.status(500).json({error: "Impossibile scaricare informazioni sugli articoli."});
    }
}