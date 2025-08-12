export async function fetchAllProducts() {
    const result = await fetch('http://localhost:4444/api/items');
    if(!result.ok) throw new Error (`errore, stato: ${result.status}`);
    return await result.json();
}