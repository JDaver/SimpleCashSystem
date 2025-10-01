import { useProductsContext, useUIContext } from '@contexts/ManageItem';
import Modal from '@components/Modal';
import './DeleteModal.css';

function DeleteModal() {
  const { products } = useProductsContext();
  const { isModalOpen, pendingDelete, setPendingDelete, handleDeleteConfirmed } = useUIContext();

  return (
    <Modal isOpen={isModalOpen} onClose={() => setPendingDelete({ items: [] })}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content className="delete-modal__content">
          <Modal.Description>
            {pendingDelete.items.length > 1
              ? 'Sei sicuro di voler eliminare gli elementi selezionati?'
              : `Sei sicuro di voler eliminare ?`}
            {/* // ${products.get(pendingDelete.items[0])?.name}// */}
          </Modal.Description>
          <Modal.Footer>
            <button onClick={handleDeleteConfirmed}>Elimina</button>
            <Modal.Close>
              <button>Annulla</button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}

export default DeleteModal;
