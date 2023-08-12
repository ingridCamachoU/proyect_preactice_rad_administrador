import { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeContext";
import logo from '../img/logo.png';
import { NavLink} from "react-router-dom";

const Menu = () => {

    const {darkMode} = useContext(DarkModeContext);

  return (

    <nav className={darkMode ? `menu dark` : `menu light`}>
        
        <ul className="d-flex flex-column items">
            <div className='ContLogo'>
                <img className="img-fluid logo" src={logo} alt="Logo"/>
            </div>

            <div className="user">
                <h5>Administrador</h5>
            </div>

            <li>
                <NavLink to='user' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-user"></i>Clientes</NavLink>
            </li>

            <li>
                <NavLink to='others'className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-list"></i>Otros</NavLink>
            </li>
            
            <li>
                <NavLink to='' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-boxes-stacked"></i>Productos</NavLink>
            </li>

            <li>
                <NavLink to='provider' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-truck-field"></i>Provedores</NavLink>    
            </li>

        </ul>
    </nav>

    );
}

export default Menu;
