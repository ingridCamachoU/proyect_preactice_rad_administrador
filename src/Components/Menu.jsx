import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeContext";

const Menu = () => {

    const {darkMode} = useContext(DarkModeContext);

  return (
    <nav className={darkMode ? `menu dark` : `menu light`}>
        <ul className="d-flex flex-column items">
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
