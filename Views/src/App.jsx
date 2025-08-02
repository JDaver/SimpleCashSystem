import MyNavBar from "./Components/navBar";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ManageItem from "./pages/ManageItem";
import ReceiptColl from "./pages/ReceiptCollection";
import CheckStackItem from "./pages/StackItem";
import Terminate from "./pages/TerminateSession";
import Home from "./pages/Home";
import NotFound from './pages/NotFound';

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
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
    
  )

  }
  


export default App
