import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Map from './pages/Map';
import logo from './assets/logo.png';

function App() {
  return (
    <>
      <div className="xl:container mx-auto">
        <Routes>
          <Route path="/" element={<Home><Navbar logo={logo}></Navbar></Home>}></Route>
          <Route path="/map" element={<Map logo={logo}></Map>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
