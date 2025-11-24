import { ManageItemProvider } from '@contexts/ManageItem/ManageItemProvider';
import ManageItem from '@pages/ManageItem';

function ManageItemWrapper() {
  return (
    <ManageItemProvider>
      <ManageItem />
    </ManageItemProvider>
  );
}

export default ManageItemWrapper;
