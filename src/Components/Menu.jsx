import { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeContext";
import logo from '../img/logo.png';
import { Link } from "react-router-dom";

const Menu = ({propUser}) => {

    const {darkMode} = useContext(DarkModeContext);

  return (

    <nav className={darkMode ? `menu dark` : `menu light`}>
        
        <ul className="d-flex flex-column items">
            <div className='ContLogo'>
                <img className="img-fluid logo" src={logo} alt="Logo"/>
            </div>

            <div className="user">
                <h5>{propUser}</h5>
            </div>

            <li>
                <Link to='/IndexUser' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-user"></i>Clientes</Link>
            </li>

            <li>
                <Link to='/IndexOthers'className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-list"></i>Otros</Link>
            </li>
            
            <li>
                <Link to='/OrdersData' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-cart-plus"></i>Pedidos</Link>
            </li>

            <li>
                <Link to='/IndexProd' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-boxes-stacked"></i>Productos</Link>
            </li>

            <li>
                <Link to='/IndexProv' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-truck-field"></i>Provedores</Link>    
            </li>
        </ul>
    </nav>

    );
}

export default Menu;
