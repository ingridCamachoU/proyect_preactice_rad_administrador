import { Routes, Route } from 'react-router-dom';
import './Styles/Styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nabvar from './Components/Nabvar';
import Menu from './Components/Menu';
import IndexProd from "./Components/ProductData/IndexProd";
import IndexUser from "./Components/UserData/IndexUser";
import IndexProv from "./Components/ProvidersData/IndexProv";
import { useContext } from 'react';
import { DarkModeContext } from './Context/DarkModeContext';


function App() {

    const {darkMode} = useContext(DarkModeContext)
  return (
      <div className={darkMode ? `body dark` : `body light`}>
            <header>
            <Nabvar/>
            </header>
            <div className={darkMode ? `container-xxl dark` : `container-xxl light`}>
                <Menu/>
                <Routes>
                    <Route path="/IndexProd" element={<IndexProd/>} />
                    <Route path="/IndexUser" element={<IndexUser/>} />
                    <Route path="/IndexProv" element={<IndexProv/>} />
                    <Route path="*" element={<div className={darkMode ? `error dark` : `error light`}><h1>404</h1> <h2>File not found</h2></div> } />
                </Routes>
            </div> 
      </div>
    );
}   

export default App;
