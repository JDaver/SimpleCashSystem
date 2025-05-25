import receiptImage from '../assets/receipt.png';
export default function(){
    return (
        <>
        <div className='rcpt-container'>
            <img src={receiptImage} className='img-rcpt' alt="receipt" />
        </div>
        </>
    )
}
