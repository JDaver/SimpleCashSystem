import Modal from '@components/Modal';
import { useAuthContext } from '@contexts/Auth';
import './SessionExpiredModal.css';

function SessionExpiredModal() {
  const { isSessionExpired, handleLogout, setIsSessionExpired } = useAuthContext();

  const handleModalClose = () => {
    handleLogout();
    setIsSessionExpired(false);
  };
  return (
    <Modal isOpen={isSessionExpired} onClose={handleModalClose}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content className="session-expired-modal__content">
          <Modal.Description>
            La sessione è scaduta. Effettua nuovamente l'accesso per continuare.
          </Modal.Description>
          <Modal.Close>
            <button>Ok</button>
          </Modal.Close>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}

export default SessionExpiredModal;
