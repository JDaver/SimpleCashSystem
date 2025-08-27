
import { useReceipt } from '@contexts/receiptHandlerContext';


function TableReceipt() {
  const {receipt, totalOfReceipt} = useReceipt();
  //const itemsInReceipt = Receipt;
  return (
    <div className="receipt">
      <div className="receipt__table-wrapper">
        <table className="receipt__content">
          <thead>
            <tr>
              <th>Articolo</th>
              <th>Quantita</th>
              <th>Prezzo</th>
            </tr>
          </thead>
          <tbody>
            {(receipt.length > 0) ?
              receipt.map((item,id) => {
              return (
                <tr key={id} className="receipt__item">
                  <td className="receipt__item-name">{item.name}</td>
                  <td className="receipt__item-quantity">{item.quantity}</td>
                  <td className="receipt__item-price">{item.price} €</td>
                </tr>);
            }) 
            :
            <tr>
              <td colSpan={3} className="empty-table"> Il carrelo e' vuoto</td>
            </tr>}
           </tbody>
          <tfoot>
            <tr className="receipt__total">
              <td colSpan="2">TOTALE</td>
              <td>{totalOfReceipt} €</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default TableReceipt;
