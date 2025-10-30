import { useState, useEffect, useCallback } from 'react';
import { useEditingContext } from '@contexts/ManageItem';
import { useFetchAll } from '@hooks/productsHook';
import { useUIContext } from '@contexts/ManageItem/UIContext';

export function useInsertItem() {
  const { insertProduct, editProduct } = useFetchAll();
  const { selectedItem, shouldResetForm, setShouldResetForm } = useEditingContext();
  const { handleTableChange } = useUIContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productDetails, setProductDetails] = useState({
    allergens: [],
    isBeverage: false,
    isGlobal: false,
    partiesRelated: [],
  });

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      setShouldResetForm(false);
    } else if (selectedItem) {
      loadSelectedItem(selectedItem);
    }
  }, [shouldResetForm, selectedItem]);

  const resetForm = () => {
    setName('');
    setPrice('');
    setProductDetails({
      allergens: [],
      isBeverage: false,
      isGlobal: false,
      partiesRelated: [],
    });
  };

  const loadSelectedItem = item => {
    setName(item.name || '');
    setPrice(item.price?.toString() || '');
    setProductDetails({
      allergens: item.allergens || [],
      isBeverage: item.isBeverage || false,
      isGlobal: item.isGlobal || false,
      partiesRelated: item.partiesRelated || [],
    });
  };

  const handleNameInput = useCallback(key => setName(prev => prev + key), []);
  const handleNameDelete = useCallback(() => setName(prev => prev.slice(0, -1)), []);
  const handlePriceInput = useCallback(
    key => {
      if (key === ',' && price.includes(',')) return;
      setPrice(prev => prev + key);
    },
    [price]
  );
  const handlePriceDelete = useCallback(() => setPrice(prev => prev.slice(0, -1)), []);

  const updateProductDetails = useCallback((field, value) => {
    setProductDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const formData = new FormData();

      if (selectedItem?.id) formData.append('id', selectedItem.id);
      formData.append('product_name', name.trim());
      formData.append('price', price);
      formData.append('isbeverage', productDetails.isBeverage ? 'on' : '');
      formData.append('isglobal', productDetails.isGlobal ? 'on' : '');
      productDetails.allergens.forEach(a => formData.append('allergens', a));
      productDetails.partiesRelated.forEach(id => formData.append('partyIDs', id));

      if (selectedItem) {
        editProduct(formData, { onSuccess: () => handleTableChange('box1') });
      } else {
        insertProduct(formData, { onSuccess: () => setShouldResetForm(true) });
      }
    },
    [name, price, productDetails, selectedItem, editProduct, insertProduct, handleTableChange]
  );

  return {
    name,
    price,
    productDetails,
    selectedItem,
    handleNameInput,
    handleNameDelete,
    handlePriceInput,
    handlePriceDelete,
    updateProductDetails,
    handleSubmit,
  };
}
