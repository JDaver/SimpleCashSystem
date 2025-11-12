import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from '@components/Modal';

const MemoXMarkIcon = React.memo(XMarkIcon);

function AllergensModal({ showModal, onClose, allergens, name }) {
  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Portal>
        <Modal.Overlay closeOnClickOutside />
        <Modal.Content className="allergens-modal__content">
          <Modal.Header className="allergens-modal__header">
            <Modal.Title className="allergens-modal__title">Allergeni in {name}</Modal.Title>
            <Modal.Close>
              <button>
                <MemoXMarkIcon width={30} height={20} />
              </button>
            </Modal.Close>
          </Modal.Header>
          <div className="modal__separator" />
          <Modal.Description className="allergens-modal__description">
            {allergens.map(allergen => {
              return <span key={allergen}>{allergen}</span>;
            })}
          </Modal.Description>
          <div className="allergens-modal__separator" />
          <Modal.Footer className="allergens-modal__footer">
            <Modal.Close>
              <button>Chiudi</button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}

export default React.memo(AllergensModal);
