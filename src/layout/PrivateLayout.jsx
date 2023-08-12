import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"
import { DarkModeContext } from "../Context/DarkModeContext";

import Menu from '../Components/Menu';
import Nabvar from '../Components/Nabvar';
import Footer from '../Components/Footer';
import { useUserContext } from "../Context/UserContext";

const PrivateLayout = () => {

    const {darkMode} = useContext(DarkModeContext); 

    const {user}  = useUserContext();

  return (
        user?
            <div className={darkMode ? `body dark` : `body light`}>
            <div className={darkMode ? `container-xxl dark` : `container-xxl light`}style={{padding: 0}}>
                <Menu/>
                <div className='contenedor' style={{padding:0}}>
                    <header>
                        <Nabvar/>
                    </header>
                    <Outlet/>          
                </div>             
            </div> 
            <Footer/>     
            </div>
        : <Navigate to="/"/>      
    )
}

export default PrivateLayout
