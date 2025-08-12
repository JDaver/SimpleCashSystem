import receiptImage from '../../assets/receipt.png';


function CostSummary(){
    return(
        <>
            <div className='rcpt-items'>
                <table>
                    <thead>
                        <tr>
                            <th>Articolo</th>
                            <th>Quantita</th>
                            <th>Prezzo</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                        <tr><td>acqua</td><td>2</td><td>1.0</td></tr>
                        <tr><td>pane</td><td>2</td><td>2.0</td></tr>
                        <tr><td>pizza</td><td>1</td><td>6.0</td></tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default function(){
    return (
        <>
        <div className='rcpt-container'>
            <div className='rcpt-img-wrapper'>
            <img src={receiptImage} className='img-rcpt' alt="receipt" />
            <CostSummary />
            <div className='rcpt-total'>
                <h3>TOTALE</h3>
                <h4>100$</h4>
            </div>
            </div>
        </div>
        </>
    )
}
