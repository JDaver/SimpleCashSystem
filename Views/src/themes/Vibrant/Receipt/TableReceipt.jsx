import { useReceipt } from '@contexts/receiptHandlerContext';


function TableReceipt() {
  const {receipt, totalOfReceipt} = useReceipt();
  //const itemsInReceipt = Receipt;
  return (
    <div className="receipt">
      <div className="receipt__table-wrapper">
        <table className="receipt__content">
           <colgroup>
            <col style={{ width: "45%" }} /> {/* 2/3 */}
            <col style={{ width: "30%" }} /> {/* 1/6 */}
            <col style={{ width: "25%" }} /> {/* 1/6 */}
          </colgroup>
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
              <td colSpan="1">TOTALE</td>
              <td colSpan={2}>{totalOfReceipt} €</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default TableReceipt;
