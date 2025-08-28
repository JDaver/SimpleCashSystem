import './Receipt.css';

function Receipt() {
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
            {Array.from({ length: 10 }).map((_, idx) => {
              return (
                <tr key={idx} className="receipt__item">
                  <td className="receipt__item-name">pizza</td>
                  <td className="receipt__item-quantity">1</td>
                  <td className="receipt__item-price">$6.0</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="receipt__total">
              <td colSpan="2">TOTALE</td>
              <td>$100</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Receipt;
