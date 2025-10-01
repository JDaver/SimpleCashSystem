import { useEffect, useState } from 'react';
import { useEditingContext } from '@contexts/ManageItem';
import { usePartyNames } from '@hooks/productsHook';

export function useInsertItem() {
  const { selectedItem, shouldResetForm, setShouldResetForm } = useEditingContext();
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const partyNames = usePartyNames();
  const [updateMode, setUpdateMode] = useState(false);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    if (shouldResetForm) {
      setUpdateMode(false);
      setName('');
      setPrice('');
      setAllergens([]);
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
    }
  }, [shouldResetForm, selectedItem]);
  const inputPrice = key => {
    if (key === '.' && (price.includes('.') || price.length == 0)) return;
    if (key === '0' && price.at(0) === '0') return;
    setPrice(prev => prev + key);
  };
  const singleDeletePrice = () => setPrice(prev => prev.slice(0, -1));
  const erasePrice = () => setPrice('');

  const inputName = key => setName(prev => prev + key);
  const singleDeleteName = () => setName(prev => prev.slice(0, -1));
  const eraseName = () => setName('');

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
  };
}
