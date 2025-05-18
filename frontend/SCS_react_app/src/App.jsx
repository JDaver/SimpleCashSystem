import MyNavBar from "./Components/navBar";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ManageItem from "./ManageItem";
import ReceiptColl from "./ReceiptCollection";
import CheckStackItem from "./StackItem";
import Terminate from "./TerminateSession";
import Home from "./Home";


function App() {
  
  return (
    <>
      <div>
        <BrowserRouter>
          <MyNavBar/>
          <Routes>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/ManageItem" element={<ManageItem/>}/>
            <Route path="/ReceiptCollection" element={<ReceiptColl/>}/>
            <Route path="/StackItem" element={<CheckStackItem/>}/>
            <Route path="/TerminateSession" element={<Terminate/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
    
  )

}

export default App
