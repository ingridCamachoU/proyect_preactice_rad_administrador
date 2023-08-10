import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { DarkModeContext } from '../Context/DarkModeContext';
import moon from '../img/Moons.png';
import sun from '../img/Sun.png';
import logo from '../img/logo.png';

const Nabvar = ({propUser, setLogin}) => {
    const [isOpenToggle, setOpenToggle] = useState(false);
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    const handleClick = () => {
        toggleDarkMode();
    }

    const user= ()=>{
        setOpenToggle(!isOpenToggle)
    }

    const signOff = () =>{
        setLogin("false");
        document.getElementById("formLogin").style.display="block"
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
                            <h6>{propUser}</h6>
                        </div>

                        <li className="nav-item">
                            <Link to='/IndexUser' className="nav-link"   onClick={user}>Clientes</Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/IndexOthers' className="nav-link"   onClick={user}>Otros</Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/OrdersData' className="nav-link"  onClick={user}>Pedidos</Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/IndexProd' className="nav-link"  onClick={user}>Productos</Link>
                        </li>

                        <li className="nav-item"> 
                            <Link to='/IndexProv' className="nav-link" onClick={user}>Provedores</Link>   
                        </li>
                    </ul>
                </div>    

                <div className="btn btn-link align-items-center toogleDark">
                    <img src={darkMode ? 
                    (sun) : (moon)} alt="Lightswitch on" onClick={handleClick}/>          
                </div >

                <span className='hr'></span>
                
                <div className="logout" onClick={signOff}>
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
