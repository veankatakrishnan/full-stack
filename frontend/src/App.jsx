import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AddStudent from "./components/AddStudent.jsx";
import ViewStudent from "./components/ViewStudent.jsx";

function App(){
  return(
    <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/view" element={<ViewStudent/>}/>
            <Route path="/add" element={<AddStudent/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;