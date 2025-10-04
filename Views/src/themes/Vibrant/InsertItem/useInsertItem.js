import { useCallback, useEffect, useState } from 'react';
import { useEditingContext } from '@contexts/ManageItem';
import { usePartyNames } from '@hooks/productsHook';

export function useInsertItem() {
  const { selectedItem, shouldResetForm, setShouldResetForm } = useEditingContext();
  const partyNames = usePartyNames();
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [allergens, setAllergens] = useState([]);
  const [isBeverage, setIsBeverage] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);
  const [partiesRelated, setPartiesRelated] = useState([]);
  const [productID, setProductId] = useState(null);

  useEffect(() => {
    if (shouldResetForm) {
      setUpdateMode(false);
      setName('');
      setPrice('');
      setAllergens([]);
      setIsBeverage(false);
      setIsGlobal(false);
      setPartiesRelated([]);
      setProductId(null);
    } else if (selectedItem) {
      setUpdateMode(true);
      setName(selectedItem.name || '');
      setPrice(selectedItem.price?.toString() || '');
      setAllergens(
        Array.isArray(selectedItem.allergens)
          ? selectedItem.allergens
          : selectedItem.allergens
            ? [selectedItem.allergens]
            : []
      );
      setIsBeverage(selectedItem.isBeverage);
      setIsGlobal(selectedItem.isGlobal);
      setPartiesRelated(selectedItem.parties.map(p => p.party_id));
      setProductId(selectedItem.id);
    }
  }, [shouldResetForm, selectedItem]);
  console.log(partiesRelated);
  const inputPrice = useCallback(key => {
    if (key === '.' && (price.includes('.') || price.length == 0)) return;
    if (key === '0' && price.at(0) === '0') return;
    setPrice(prev => prev + key);
  }, []);
  const singleDeletePrice = useCallback(() => setPrice(prev => prev.slice(0, -1)), []);
  const erasePrice = useCallback(() => setPrice(''), []);

  const inputName = useCallback(key => {
    setName(prev => prev + key);
  }, []);
  const singleDeleteName = useCallback(() => {
    setName(prev => prev.slice(0, -1));
  }, []);
  const eraseName = useCallback(() => setName(''));

  return {
    price,
    name,
    inputPrice,
    singleDeletePrice,
    erasePrice,
    inputName,
    singleDeleteName,
    eraseName,
    partyNames,
    allergens,
    setAllergens,
    updateMode,
    isBeverage,
    setIsBeverage,
    isGlobal,
    setIsGlobal,
    partiesRelated,
    setPartiesRelated,
    productID,
  };
}
