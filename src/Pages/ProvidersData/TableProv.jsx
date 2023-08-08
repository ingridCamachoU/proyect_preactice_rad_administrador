import { useContext } from 'react';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../../Context/DarkModeContext';
import Button from '../../Components/Button';

const TableProv = ({data, setEditData, deleteProv,  openModal, setTitle}) => {

    const {darkMode} = useContext(DarkModeContext);

    const handleClick =(item)=>
    {
        setEditData(item);
        openModal();
        setTitle('Editar Proveedor');
    };

    const handleClickDelete =(item)=>
    {
        Swal.fire({
            title: 'Eliminar proveedor',
            text: "Está seguro de eliminar el proveedor?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El proveedor ha sido eliminado.',
                'success'
                )
              deleteProv(item);
            }
        })
    };
    
  return ( 
    <>
        <div className="row tabla">
            <div className="col table-responsive" style={{padding: 0}}>
                <table className={darkMode ? `table dark` : `table light`}>
                    <thead className="table-light">
                        <tr>
                            <th>Nit</th>
                            <th >Nombre</th>
                            <th>Contacto</th>
                            <th>Email</th>
                            <th >Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {   
                            data.length === 0 ? <tr ><td colSpan="6" className="text-center">No hay datos</td></tr>
                            :data.map( item => (
                                <tr key={item.id}>
                                    <td>{item.nit}</td>
                                    <td>{item.name}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Button className={"btn btn-success m-1" } text={<i className="fa-solid fa-pen"></i>} onClick={handleClick} item={item}/>

                                        <Button className={"btn btn-danger m-1" } text={<i className="fa-solid fa-trash"></i>} onClick={handleClickDelete} item={item.id}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>      
                </table>
            </div>
        </div>
    </>
    )
}

export default TableProv;
