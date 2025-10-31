import Modal from '@components/Modal';
import TableReceipt from '../Receipt/TableReceipt';
import '../Receipt/Receipt.css';
import './ReceiptModal.css';
import { useCollectionProvider } from '../../../contexts/CollectionItem/collectionContext';

export default function ReceiptModal() {
  const { itemsInReceipt, setItemsInReceipt, totalReceipt, isModalOpen, title } =
    useCollectionProvider();

  return (
    <Modal isOpen={isModalOpen} onClose={() => setItemsInReceipt([])}>
      <Modal.Portal>
        <Modal.Overlay closeOnClickOutside={true} />
        <Modal.Content className="receipt-modal__content">
          <TableReceipt receipt={itemsInReceipt} totalOfReceipt={totalReceipt} title={title} />
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}
