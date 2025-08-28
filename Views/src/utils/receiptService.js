async function productsConstructor(formData){
    const receiptJSON = formData.get("receipt");
    const data = {
        id_party: formData.get("id_party"),
        tot_price: formData.get("tot_price"),
        receipt: receiptJSON ? JSON.parse(receiptJSON) : [],
        date: Date.now()
    };
    return data;
}

export async function createReceipt(event){
    event.preventDefault()

    const formData = new FormData(event.target);
    const data = await productsConstructor(formData);
    console.log("data:   ***",JSON.stringify(data));
    fetch('http://localhost:4444/api/create_receipt', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        console.log('scontrino emesso correttamente! ',data);
    })
    .catch(err => console.error('Errore inaspettato: ',err)); 
}