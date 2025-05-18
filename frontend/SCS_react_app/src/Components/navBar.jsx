import {Link} from 'react-router-dom'
function MyNavBar(){
    return(
        <>
            <nav>
                <div className="nav-bar">
                    <Link to="../Home"> Home</Link > 
                    <Link to="../ManageItem"> Modifica articoli</Link > 
                    <Link to="../ReceiptCollection" > Elenco scontrini</Link >
                    <Link to="../StackItem"> controlla stock articoli</Link >
                    <Link to="../TerminateSession"> Chiusura giornata</Link >
                </div>
            </nav>
        </>
    )
};

export default MyNavBar;