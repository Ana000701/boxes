import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Map from "./pages/Map";
import logo from "./assets/logo.png";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Filtering from "components/Filtering";

function App() {
  return (
    <>
      <div className='xl:container mx-auto'>
        <Routes>
          <Route
            path='/'
            element={
              <Home>
                <Navbar logo={logo}></Navbar>
              </Home>
            }
          ></Route>
          <Route path='/map' element={<Map logo={logo}></Map>}></Route>
          <Route path='/signin' element={<Signin logo={logo}></Signin>}></Route>
          <Route path='/signup' element={<Signup logo={logo}></Signup>}></Route>
          <Route path='/table' element={<Filtering logo={logo}></Filtering>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
