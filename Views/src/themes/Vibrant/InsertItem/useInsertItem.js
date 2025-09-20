import { useState } from "react"; 


export  function handleInputs(key){
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
 
    const inputPrice = (key) => {
        if (key === '.' && (price.includes('.') || price.length == 0)) return;
        if (key === '0' && price.at(0) === '0') return;
        setPrice(prev => prev + key);
    }
    const singleDeletePrice = () => setPrice(prev => prev.slice(0, -1));
    const erasePrice = () => setPrice('');

    const inputName = (key) => setName(prev => prev + key);
    const singleDeleteName = () => setName(prev =>prev.slice(0,-1));
    const eraseName = () => setName('');

    return {price, name, inputPrice, singleDeletePrice, erasePrice, inputName, singleDeleteName, eraseName}
}
