import {Link} from 'react-router-dom'
function MyNavBar(){
    return(
        <>   
         <div className="nav-bar">
         <Link className='nav-btn' to="../Main"> Cassa</Link  >    
         <Link className='nav-btn'  to="../ManageItem"> Modifica articoli</Link  > 
         <Link className='nav-btn' to="../Collection" > Storico</Link  >    
         <Link className='nav-btn' to="../TerminateSession"> Chiusura giornata</Link >   
         </div>  
        </>
    )
};

export default MyNavBar;