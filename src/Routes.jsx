import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import IndexUser from './Pages/UserData/IndexUser';
import IndexOthers from './Pages/Others/IndexOthers';
import IndexProv from './Pages/ProvidersData/IndexProv';
import IndexProd from './Pages/ProductData/IndexProd';

const Routes = () => {
  return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path='/Login' element={<Login/>} />
                    <Route path="/IndexUser" element={<IndexUser/>} />
                    <Route path="/IndexOthers" element={<IndexOthers/>} />
                    <Route path="/IndexProv" element={<IndexProv/>} />
                    <Route path="/IndexProd" element={<IndexProd/>}/>
                    <Route path="*" element={<div className={darkMode ? `error dark contenedor` : `error light `}><h1>404</h1> <h2>File not found</h2></div> } />
                </Routes>   
            </BrowserRouter>
        </>
    )
}

export default Routes
