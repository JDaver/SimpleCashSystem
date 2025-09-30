import { useMemo, useState } from 'react';
import { EditingContext } from './EditingContext';

export const EditingProvider = ({ children }) => {
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const contextValue = useMemo(
    () => ({
      shouldResetForm,
      setShouldResetForm,
      selectedItem,
      setSelectedItem,
    }),
    [selectedItem, shouldResetForm, setShouldResetForm]
  );

  return <EditingContext.Provider value={contextValue}>{children}</EditingContext.Provider>;
};
