import { Routes, Route } from 'react-router-dom';
import './Styles/Styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Nabvar from './Components/Nabvar';
import Menu from './Components/Menu';
import IndexProd from "./Pages/ProductData/IndexProd";
import IndexUser from "./Pages/UserData/IndexUser";
import IndexProv from "./Pages/ProvidersData/IndexProv";
import IndexOthers from "./Pages/Others/IndexOthers";
import { useContext } from 'react';
import { DarkModeContext } from './Context/DarkModeContext';
import Footer from './Components/Footer';

function App() {
    const {darkMode} = useContext(DarkModeContext)
  return (
      <div className={darkMode ? `body dark` : `body light`}>
            <div className={darkMode ? `container-xxl dark` : `container-xxl light`}style={{padding: 0}}>
                <Menu/>
                <div className='contenedor' style={{padding:0}}>
                    <header>
                        <Nabvar/>
                    </header>
                    <Routes>
                        <Route path="/IndexUser" element={<IndexUser/>} />
                        <Route path="/IndexProd" element={<IndexProd/>}/>
                        <Route path="/IndexOthers" element={<IndexOthers/>} />
                        <Route path="/IndexProv" element={<IndexProv/>} />
                        <Route path="*" element={<div className={darkMode ? `error dark contenedor` : `error light `}><h1>404</h1> <h2>File not found</h2></div> } />
                    </Routes>               
                </div>             
            </div> 
            <Footer/>     
      </div>
    );
}   

export default App;
