import { useState, useEffect, useCallback, useMemo } from 'react';
import { useEditingContext } from '@contexts/ManageItem';
import { useFetchAll } from '@hooks/productsHook';
import { useUIContext } from '@contexts/ManageItem/UIContext';
import { formatPrice } from '../../../utils/helpers';

export function useInsertItem() {
  const { insertProduct, editProduct } = useFetchAll();
  const { selectedItem, shouldResetForm, setShouldResetForm } = useEditingContext();
  const { handleTableChange } = useUIContext();

  const [name, setName] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [allergens, setAllergens] = useState([]);
  const [isBeverage, setIsBeverage] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);
  const [partiesRelated, setPartiesRelated] = useState([]);

  const resetForm = useCallback(() => {
    setName('');
    setPriceValue('');
    setAllergens([]);
    setIsBeverage(false);
    setIsGlobal(false);
    setPartiesRelated([]);
  }, []);

  const loadSelectedItem = useCallback(item => {
    setName(item.name || '');

    if (item.price != null && item.price !== '') {
      const numeric = Number(String(item.price).replace(',', '.')) || 0;
      setPriceValue(numeric.toFixed(2).replace('.', ','));
    } else {
      setPriceValue('');
    }

    setAllergens(item.allergens || []);
    setIsBeverage(item.isBeverage);
    setIsGlobal(item.isGlobal);
    setPartiesRelated(item.partiesRelated || []);
  }, []);

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      setShouldResetForm(false);
      return;
    }
    if (selectedItem) loadSelectedItem(selectedItem);
  }, [shouldResetForm, selectedItem, resetForm, loadSelectedItem, setShouldResetForm]);

  const handleNameInput = useCallback(key => setName(prev => prev + key), []);
  const handleNameDelete = useCallback(() => setName(prev => prev.slice(0, -1)), []);

  const handlePriceInput = useCallback(key => {
    setPriceValue(prev => {
      if (!/[0-9,]/.test(key)) return prev;

      if (key === ',') {
        if (prev.includes(',')) return prev;
        return prev === '' ? '0,' : prev + ',';
      }

      const [, decimal = ''] = prev.split(',');
      if (decimal.length >= 2 && prev.includes(',')) return prev;

      const newValue = prev === '0' && key !== ',' ? key : prev + key;
      return newValue;
    });
  }, []);

  const handlePriceDelete = useCallback(() => {
    setPriceValue(prev => prev.slice(0, -1));
  }, []);

  const priceDisplay = useMemo(() => formatPrice(priceValue), [priceValue]);

  const numericPrice = useMemo(() => {
    if (!priceValue) return '';
    return priceValue.replace(/\./g, '').replace(',', '.');
  }, [priceValue]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const formData = new FormData();
      if (selectedItem?.id) formData.append('id', selectedItem.id);
      formData.append('product_name', name.trim());
      formData.append('price', numericPrice);
      formData.append('isbeverage', isBeverage ? 'on' : '');
      formData.append('isglobal', isGlobal ? 'on' : '');
      allergens.forEach(a => formData.append('allergens', a));
      partiesRelated.forEach(id => formData.append('partyIDs', id));

      if (selectedItem) {
        editProduct(formData, { onSuccess: () => handleTableChange('box1') });
      } else {
        insertProduct(formData, { onSuccess: () => setShouldResetForm(true) });
      }
    },
    [
      name,
      numericPrice,
      isBeverage,
      isGlobal,
      allergens,
      partiesRelated,
      selectedItem,
      editProduct,
      insertProduct,
      handleTableChange,
      setShouldResetForm,
    ]
  );

  return {
    name,
    price: priceValue,
    priceDisplay,
    isBeverage,
    isGlobal,
    allergens,
    partiesRelated,
    selectedItem,
    setAllergens,
    setIsBeverage,
    setIsGlobal,
    setPartiesRelated,
    handleNameInput,
    handleNameDelete,
    handlePriceInput,
    handlePriceDelete,
    handleSubmit,
  };
}
