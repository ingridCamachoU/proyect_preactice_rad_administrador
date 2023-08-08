import { useContext } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";

const TableUser = ({dataQ}) => {

    const {darkMode} = useContext(DarkModeContext);

    const handleClick =(item)=>
    {
        console.log(item)
    };

    const handleClickDelete =(item)=>
    {
        console.log(item)
    };
  return (
        <>
            <div className="row tabla">
                <div className="col table-responsive" style={{padding:0}}>
                    <table className={darkMode ? `table dark` : `table light`}>
                        <thead className="table-light">
                        <tr>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acciones</th>
                        </tr>
                        </thead>

                        <tbody>
                            {   
                                dataQ.length === 0 ? <tr><td colSpan="6" className="text-center">No hay datos</td></tr>
                                :dataQ.map( item => (
                                    <tr key={item.id}>
                                        <td>{item.provider.name}</td>
                                        <td>{item.price}</td>
                                        <td>Descripcion</td>
                                        <td>
                                            <button type="button" className="btn btn-success m-1" 
                                            onClick={()=> {handleClick(item)}}>
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button type="button" className="btn btn-danger m-1" onClick={()=>handleClickDelete(item.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody> 
                    </table>
                </div>
            </div>
        </>
    );
}

export default TableUser;
