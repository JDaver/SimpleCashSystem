import MyNavBar from "./Components/navBar";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ManageItem from "./pages/ManageItem";
import Collection from "./pages/Collection";
import Terminate from "./pages/TerminateSession";
import Main from "./pages/Main";
import NotFound from './pages/NotFound';

function App() {

    return (
    <>
      <div>
        <BrowserRouter>
          <MyNavBar/>
          <Routes>
            <Route path="/Main" element={<Main/>}/>
            <Route path="/ManageItem" element={<ManageItem/>}/>
            <Route path="/Collection" element={<Collection/>}/>
            <Route path="/TerminateSession" element={<Terminate/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
    
  )

  }
  


export default App
