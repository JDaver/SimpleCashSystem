import { EditingProvider } from './EditingProvider';
import { ProductsProvider } from './ProductsProvider';
import { SelectionProvider } from './SelectionProvider';
import { UIProvider } from './UIProvider';

export const ManageItemProvider = ({ children }) => {
  return (
    <ProductsProvider>
      <SelectionProvider>
        <EditingProvider>
          <UIProvider>{children}</UIProvider>
        </EditingProvider>
      </SelectionProvider>
    </ProductsProvider>
  );
};

export default ManageItemProvider;
