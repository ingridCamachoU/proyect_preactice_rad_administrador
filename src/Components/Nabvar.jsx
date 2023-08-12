import { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import { DarkModeContext } from '../Context/DarkModeContext';
import moon from '../img/Moons.png';
import sun from '../img/Sun.png';
import logo from '../img/logo.png';
import { logout } from '../config/firebase';

const Nabvar = () => {
    const [isOpenToggle, setOpenToggle] = useState(false);
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    const handleClick = () => {
        toggleDarkMode();
    }

    const user= ()=>{
        setOpenToggle(!isOpenToggle)
    }

    const handleLogout = async() =>{
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }
  return (
        <nav className="navbar">
            
            <div className={darkMode ? `container-fluid dark` : `container-fluid light`}>
                
            <form className="searchForm" role="search">

                <div className={darkMode ? `nav-items dark ${isOpenToggle &&"openToggle" }`: `nav-items light ${isOpenToggle &&"openToggle" }` }>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <div className='ContLogo'>
                            <img className="img-fluid logo" src={logo} alt="Logo"/>
                        </div>

                        <div className="user">
                            <h6>Administrador</h6>
                        </div>

                        <li className="nav-item">
                            <NavLink to='user' className="nav-link"   onClick={user}>Clientes</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='others' className="nav-link"   onClick={user}>Otros</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to='' className="nav-link"  onClick={user}>Productos</NavLink>
                        </li>

                        <li className="nav-item"> 
                            <NavLink to='provider' className="nav-link" onClick={user}>Provedores</NavLink>   
                        </li>
                    </ul>
                </div>    

                <div className="btn btn-link align-items-center toogleDark">
                    <img src={darkMode ? 
                    (sun) : (moon)} alt="Lightswitch on" onClick={handleClick}/>          
                </div >

                <span className='hr'></span>
                
                <div className="logout" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket logout"></i>
                </div>

                <span className='hr'></span>
                
                <div className={`toggler ${isOpenToggle &&"openToggle" }`} onClick={user}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </form>         
            </div>     
        </nav>
    )
}

export default Nabvar;
