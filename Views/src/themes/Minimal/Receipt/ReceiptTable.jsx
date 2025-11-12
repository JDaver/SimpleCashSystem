import { useTheme } from '@contexts/Theme';
import './Receipt.css';

function ReceiptTable({ receipt, total }) {
  const { theme } = useTheme();

  const hasItems = receipt.length > 0;

  return (
    <div className="receipt">
      <div className={`receipt__table-wrapper ${theme}`}>
        <table className={`receipt__content ${theme} receipt__header`}>
          <thead>
            <tr>
              <th>Articolo</th>
              <th>Quantità</th>
              <th>Prezzo</th>
            </tr>
          </thead>
        </table>
        <div className="receipt__scroll-area">
          <table className={`receipt__content ${theme} receipt__body`}>
            <tbody>
              {hasItems ? (
                receipt.map(item => (
                  <tr key={item.id} className="receipt__item">
                    <td className="receipt__item-name">{item.name}</td>
                    <td className="receipt__item-quantity">{item.quantity}</td>
                    <td className="receipt__item-price">{item.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Il carrello è vuoto</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <table className={`receipt__content ${theme} receipt__footer`}>
          <tfoot>
            <tr className="receipt__total">
              <td colSpan="2">TOTALE</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ReceiptTable;
