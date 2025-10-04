import { useProductsContext, useUIContext } from '@contexts/ManageItem';
import Modal from '@components/Modal';
import './DeleteModal.css';
import { useSelectionContext } from '../../../contexts/ManageItem/SelectionContext';

function DeleteModal() {
  const { products, deleteProduct } = useProductsContext();
  const { selectedIds } = useSelectionContext();
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
