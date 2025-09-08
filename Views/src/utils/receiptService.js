async function productsConstructor(formData){
    const receiptJSON = formData.get("receipt");
    const data = {
        id_party: formData.get("id_party"),
        tot_price: formData.get("tot_price"),
        receiptOBJ: receiptJSON ? JSON.parse(receiptJSON) : [],
        date: Date.now()
    };
    return data;
}

export async function createReceipt(event){
    const formData = new FormData(event.target);
    const data = await productsConstructor(formData);

    if (data.receiptOBJ.length === 0) throw new Error('Impossibile emettere scontrino, devi selezionare almeno un ogggetto.')
    
    

    return fetch('http://localhost:4444/api/create_receipt', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
        })
        .then(res => {
            if(!res.ok) throw new Error('Errore, impossibile Emettere Scontrino');
            res.json();
        })
        .then(data => {
            console.log('scontrino emesso correttamente! ',data);
        });
}

export async function queryReceipts(date = null, party = null, order = null){
    try {
    const res = await fetch('http://localhost:4444/api/collection_fetch_receipts');

    if (!res.ok) {
      throw new Error(`Errore nella fetch, status: ${res.status}`);
    }
    const data = await res.json();
    console.log("api: ",data);
    return data; 
  } catch (err) {
    throw new Error(`Errore nel recuperare i dati: ${err.message}`);
  }
}