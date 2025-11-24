import { CollectionProvider } from '@contexts/CollectionItem/collectionContext';
import Collection from '@pages/Collection';

function CollectionWrapper() {
  return (
    <CollectionProvider>
      <Collection />
    </CollectionProvider>
  );
}

export default CollectionWrapper;
