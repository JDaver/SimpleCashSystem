const product = require('../../controllers/controllerProduct');
const { createProduct_party } = require('../../controllers/controllerProduct_party');
/**
 * router.post('/insert_item', item.createProduct);
 * router.delete('/delete_item/:id', item.deleteProduct);
 * router.put('/update_item',item.updateProduct);
 * router.get('/items',item.fetchProducts);
 */

exports.createProduct = async(req,res) => {
    const {product = {}, partyIDs = []} = req.body || {};

    try{
        const productRes = await product.createProduct(product);
        
        if(Array.isArray(partyIDs) && partyIDs.length > 0){
            const product_id = productRes.rows[0].product_id;
            const relationRes = await createProduct_party(product_id, partyIDs);
        }
        res.status(200).json({
            product: productRes,
            relations: relationRes
        });
    }catch(err){
        console.error(`product api catched an error -> ${err}`)
        res.status(500).json({error: "Impossibile completare operazione di creazione del prodotto!"});
    }
    product.createProduct(product);
    
}