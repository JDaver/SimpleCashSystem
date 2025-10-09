import Modal from '@components/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LoginForm from '@components/LoginForm';
import './NewUserModal.css';

function NewUserModal({ showModal, onClose }) {
  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Portal>
        <Modal.Overlay closeOnClickOutside />
        <Modal.Content className="new-user-modal__content">
          <Modal.Header className="new-user-modal__header">
            <Modal.Title>Nuovo utente</Modal.Title>
            <Modal.Close>
              <button>
                <XMarkIcon width={30} height={20} />
              </button>
            </Modal.Close>
          </Modal.Header>
          <LoginForm isModal />
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}

export default NewUserModal;
