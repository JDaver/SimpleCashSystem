import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon';
import { useReceipt } from '@contexts/receiptHandlerContext';
import { createReceipt } from '@utils/receiptService';
import { useToast } from '../../../components/Toast/Toast';
import { ArrowUturnDownIcon } from '@heroicons/react/24/outline';

export default function ControlButtons() {
  const { clearReceipt, receipt, totalOfReceipt } = useReceipt();
  const filteredReceipt = JSON.stringify(
    receipt.map(({ id, quantity, name }) => ({ id, quantity, name }))
  );
  console.log(receipt); //Debug
  const { addToast } = useToast();

  async function handleSubmit(event) {
    event.preventDefault();

    createReceipt(event)
      .then(data => {
        clearReceipt();
        addToast({
          content: () => (
            <div className="vibrant-toast success">
              <span>{data}</span>
            </div>
          ),
          position: 'bottom-left',
          duration: 5000,
        });
      })
      .catch(err => {
        console.error(err);
        addToast({
          content: () => (
            <div className="vibrant-toast error">
              <span>
                <p>{err.message || `Qualcosa e' andato storto`}</p>
              </span>
            </div>
          ),
          position: 'bottom-left',
          duration: 5000,
        });
      });
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <input type="hidden" name="receipt" value={filteredReceipt} />
      <input type="hidden" name="id_party" value={null} />{' '}
      {/* TO FIX: change due to party selcted in options */}
      <input
        type="hidden"
        name="tot_price"
        value={totalOfReceipt > 0 ? totalOfReceipt : ''}
        required
      />
      <div className="control-area">
        <button className="control-btn-clear" onClick={() => clearReceipt()} type="button">
          Pulisci lo scontrino
        </button>
        <button className="control-btn-submit">
          <ArrowUpCircleIcon style={{ width: 60, height: 30 }} type="submit" />
        </button>
      </div>
    </form>
  );
}
