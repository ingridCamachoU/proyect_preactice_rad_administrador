import { Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Nabvar from './Nabvar';
import IndexUser from '../Pages/UserData/IndexUser';
import IndexProd from '../Pages/ProductData/IndexProd';
import IndexProv from '../Pages/ProvidersData/IndexProv';
import IndexOthers from '../Pages/Others/IndexOthers';
import Footer from './Footer';
import { useContext } from 'react';
import { DarkModeContext } from '../Context/DarkModeContext';

const Content = ({userDisplay, setLogin}) => {
    const {darkMode} = useContext(DarkModeContext);
  return (
        <div className={darkMode ? `body dark` : `body light`}>
                <div className={darkMode ? `container-xxl dark` : `container-xxl light`}style={{padding: 0}}>
                    <Menu propUser={userDisplay}/>
                    <div className='contenedor' style={{padding:0}}>
                        <header>
                            <Nabvar  propUser={userDisplay} setLogin={setLogin}/>
                        </header>
                        <Routes>
                            <Route path="/IndexUser" element={<IndexUser/>} />
                            <Route path="/IndexOthers" element={<IndexOthers/>} />
                            <Route path="/IndexProv" element={<IndexProv/>} />
                            <Route path="/IndexProd" element={<IndexProd/>}/>
                            <Route path="*" element={<div className={darkMode ? `error dark contenedor` : `error light `}><h1>404</h1> <h2>File not found</h2></div> } />
                        </Routes>               
                    </div>             
                </div> 
                <Footer/>     
        </div>
    );
}

export default Content;
