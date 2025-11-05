import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditingContext } from '@contexts/ManageItem';
import { usePartyNames } from '@hooks/productsHook';
import { useProductsContext } from '../../../contexts/ManageItem/ProductsContext';

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
  const productID = useRef(null);

  useEffect(() => {
    if (shouldResetForm) {
      setUpdateMode(false);
      setName('');
      setPrice('');
      setAllergens([]);
      setIsBeverage(false);
      setIsGlobal(false);
      setPartiesRelated([]);
      setShouldResetForm(false);
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
      productID.current = selectedItem.id;
    }
  }, [shouldResetForm, selectedItem]);
  const inputPrice = useCallback(
    key => {
      if (!/[0-9,]/.test(key)) return;
      if (key === '0' && price.at(0) === '0' && price.length === 1) return;

      if (key === ',') {
        if (price.includes(',')) return;
        if (price === '') return setPrice('0,');
      }
      if (price.at(-3) === ',') return;

      setPrice(prev => prev + key);
    },
    [price]
  );
  const singleDeletePrice = useCallback(() => setPrice(prev => prev.slice(0, -1)), []);
  const erasePrice = useCallback(() => setPrice(''), []);

  const inputName = useCallback(key => {
    setName(prev => prev + key);
  }, []);
  const singleDeleteName = useCallback(() => {
    setName(prev => prev.slice(0, -1));
  }, []);
  const eraseName = useCallback(() => setName(''), []);

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
    setShouldResetForm,
  };
}
