import DisplayElements from '../DisplayElements/DisplayElements';
import { useProductsContext } from '@contexts/ManageItem';
import ProductItem from '../ProductItem';
import ActionButtons from '../ProductItem/ActionButtons';
import { formatPrice } from '../../../utils/helpers';

function EditItem() {
  const { products } = useProductsContext();
  return (
    <DisplayElements
      height="450px"
      infoGridColumns="300px 150px 100px"
      labels={['Nome', 'Prezzo', 'Informazioni']}
    >
      {Array.from(products.values()).map(({ id, name, price, allergens }) => {
        return (
          <ProductItem
            key={id}
            id={id}
            name={name}
            price={formatPrice(price.toString().replace('.', ','))}
            allergens={allergens}
            isInteractive
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
