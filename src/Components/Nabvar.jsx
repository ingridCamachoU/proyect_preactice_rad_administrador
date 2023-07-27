import { useContext, useState } from 'react';
import logo from '../img/logo.jpeg';
import { Link } from "react-router-dom";
import { DarkModeContext } from '../Context/DarkModeContext';
import moon from '../img/Moons.png';
import sun from '../img/Sun.png';

const Nabvar = () => {

    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    const handleClick = () => {
        toggleDarkMode();
    }

    const user= ()=>{
        setOpenToggle(!isOpenToggle)
    }
    const [isOpenToggle, setOpenToggle] = useState(false);
  return (
        <nav className="navbar bg-body-tertiary d-flex">
            <div className="container-fluid d-flex">
                <div className="d-flex ContLogo">
                    <div className='contenidoLogo'>
                        <img className="img-fluid logo mx-2" src={logo} alt="Logo"/>
                    </div>
                    <div className="d-flex flex-column justify-content-end user">
                        <h4>William</h4>
                        <h6>Administrador</h6>
                    </div>
                </div>
                <form className="search" role="search">
                    <input className="form-control me-2 
                    search"  type="search" placeholder="Search"/>

                    <div className={`nav-items ${isOpenToggle &&"openToggle" }`}>
                        <ul>
                            <li>
                                <Link to='/IndexUser' className={`toggler ${isOpenToggle &&"openToggle" }`} onClick={user}>Clientes</Link>
                            </li>

                            <li>
                                <Link to='/IndexOthers' className={`toggler ${isOpenToggle &&"openToggle" }`} onClick={user}>Otros</Link>
                            </li>

                            <li>
                                <Link to='/OrdersData' className={`toggler ${isOpenToggle &&"openToggle" }`} onClick={user}>Pedidos</Link>
                            </li>

                            <li>
                                <Link to='/IndexProd' className={`toggler ${isOpenToggle &&"openToggle" }`} onClick={user}>Productos</Link>
                            </li>

                            <li>
                                <Link to='/IndexProv' className={`toggler ${isOpenToggle &&"openToggle" }`} onClick={user}>Provedores</Link>   
                            </li>
                        </ul>
                    </div>    

                    <div className={`toggler ${isOpenToggle &&"openToggle" }`} onClick={user}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                        
                    <div className="btn btn-link align-items-center toogleDark">
                        <img src={darkMode ? 
                        (sun) : (moon)} alt="Lightswitch on" onClick={handleClick}/>          
                    </div >

                </form>         
            </div>     
        </nav>
    )
}

export default Nabvar;
