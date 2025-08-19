import Item from '../Item/Item';
import './CashierScreen.css';

function CashierScreen() {
  return (
    <div className="cashier-screen">
      <div className="cashier-screen__wrapper">
        <h1 className="cashier-screen__header">Cucina</h1>
        <ul className="cashier-screen__content">
          {Array.from({ length: 50 }).map((_, idx) => {
            return <Item key={idx} name={`Prodotto ${idx + 1}`} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default CashierScreen;
