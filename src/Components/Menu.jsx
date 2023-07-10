import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeContext";

const Menu = () => {

    const {darkMode} = useContext(DarkModeContext);

  return (
    <nav className={darkMode ? `menu dark` : `menu light`}>
        <div className="d-flex flex-column items">
            <Link to='/OrdersData' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-cart-plus"></i>Pedidos</Link>
            <Link to='/IndexProd' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-boxes-stacked"></i>Productos</Link>
            <Link to='/IndexUser' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-user"></i>Clientes</Link>
            <Link to='/IndexProv' className={darkMode ? `item dark` : `item light`}><i className="fa-solid fa-truck-field"></i>Provedores</Link>    
        </div>
    </nav>
    );
}

export default Menu;
