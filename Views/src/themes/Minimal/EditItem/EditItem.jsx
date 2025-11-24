import DisplayElements from '../DisplayElements/DisplayElements';
import { useProductsContext } from '@contexts/ManageItem';
import ActionButtons from '../ProductItem/ActionButtons';
import { formatPrice } from '../../../utils/helpers';
import InteractiveItem from '../InteractiveItem/InteractiveItem';

function EditItem() {
  const { products } = useProductsContext();
  return (
    <DisplayElements
      height="450px"
      infoGridColumns="300px 150px 1fr"
      labels={['Nome', 'Prezzo', 'Allergeni']}
    >
      {Array.from(products.values()).map(({ id, name, price, allergens }) => {
        return (
          <InteractiveItem
            key={id}
            id={id}
            name={name}
            price={formatPrice(price.toString().replace('.', ','))}
            allergens={allergens}
            renderActions={({ showActions, handleDelete }) => {
              return showActions && <ActionButtons onDelete={handleDelete} />;
            }}
          />
        );
      })}
    </DisplayElements>
  );
}

export default EditItem;
