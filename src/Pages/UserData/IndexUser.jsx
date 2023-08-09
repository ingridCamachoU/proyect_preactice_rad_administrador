
import { useContext, useEffect, useState } from "react";
import TableUser from "./TableUser";
import axios from "axios";
import { DarkModeContext } from "../../Context/DarkModeContext";

const IndexUser = () => {

    const [dataQ, setDataQ] = useState([]);

    const {darkMode} = useContext(DarkModeContext);

    const loadDataQ = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: "http://localhost:8000/api/v1/products/1/quotations",
            headers: { },
            data : dataQ
        };

        const response = await axios(config)
        setDataQ(response.data);
    };

    useEffect(() => {
        loadDataQ();
    },[]);

    return (
        <section className={darkMode ? `contenedor dark` : `contenedor light`}>
            <div className="nav-contenedor">
                    <h1 className="text-center">Lista de Clientes</h1>  
            </div>
            <TableUser  dataQ={dataQ} />
        </section>
    );
}

export default IndexUser;
