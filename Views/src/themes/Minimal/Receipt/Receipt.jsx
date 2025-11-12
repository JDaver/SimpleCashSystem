import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useReceipt } from '@contexts/receiptHandlerContext';
import { createReceipt } from '../../../utils/receiptService';
import { useToast } from '../../../components/Toast/Toast';
import ReceiptTable from './ReceiptTable';
import './Receipt.css';

function Receipt() {
  const { clearReceipt, receipt, totalOfReceipt } = useReceipt();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = await createReceipt(e);
      clearReceipt();
      addToast({
        content: ({ onClose }) => (
          <div className="receipt__toast-success">
            <p>{message}</p>
            <button className="receipt__toast-close" onClick={onClose}>
              <XMarkIcon width={30} height={20} />
            </button>
          </div>
        ),
        position: 'bottom-left',
        duration: 5000,
      });
    } catch (err) {
      addToast({
        content: ({ onClose }) => (
          <div className="receipt__toast-error">
            <p>{err.message || 'Qualcosa è andato storto'}</p>
            <button className="receipt__toast-close" onClick={onClose}>
              <XMarkIcon width={30} height={20} />
            </button>
          </div>
        ),
        position: 'bottom-left',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="receipt__wrapper">
      <ReceiptTable receipt={receipt} total={totalOfReceipt} />
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="receipt" value={JSON.stringify(receipt)} />
        <input type="hidden" name="id_party" value={''} />
        <input
          type="hidden"
          name="tot_price"
          value={totalOfReceipt > 0 ? totalOfReceipt : ''}
          required
        />
        <div className="receipt__buttons-wrapper">
          <button
            className="receipt__clear-btn"
            type="button"
            onClick={clearReceipt}
            disabled={isSubmitting}
          >
            Annulla
          </button>
          <button className="receipt__confirm-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Invio...' : 'Conferma'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Receipt;
