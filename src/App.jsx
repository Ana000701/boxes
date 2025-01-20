import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Map from './pages/Map';
import logo from './assets/LOGO.png';

function App() {
  return (
    <>
      <Navbar logo={logo}></Navbar>
      <div className="xl:container mx-auto">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/map" element={<Map/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
