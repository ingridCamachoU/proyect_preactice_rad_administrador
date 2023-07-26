import { useContext } from 'react';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../../Context/DarkModeContext';

const TableProduct = ({datasProduct, setEditDataProduct, deleteProduct, openModalEditProduct,  loadDatasQuotation, openProductDetailsModal}) => {
    
    const {darkMode} = useContext(DarkModeContext);

    const handleClick =(product)=>
    {
        setEditDataProduct(product);
        openModalEditProduct();
        loadDatasQuotation(product);
    };

    const handleClickDetails =(product)=>{
        setEditDataProduct(product);
        openProductDetailsModal();
        loadDatasQuotation(product);
    }

    const handleClickDelete =(product)=>
    {
        Swal.fire({
            title: 'Eliminar producto',
            text: "Está seguro de eliminar el producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success'
                )
              deleteProduct(product);
            }
        })
    };

  return ( 
    <>
        <div className="row tabla">
            <div className="col table-responsive">
            <table className={darkMode ? `table dark` : `table light`}>
                <thead className="table-light">
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Transmisión</th>
                        <th scope="col">Precio</th>
                        <th scope="col">% Ganancia</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Imagenes</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {   
                        datasProduct.length === 0 ? <tr><td colSpan="6" className="text-center">No hay datos</td></tr>
                        :(datasProduct.map)( product => (
                            <tr  key={product.id}>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{product.category.name}</td>
                                <td>{product.mark_model.name} ({product.mark_model.mark.name})</td>
                                <td>{product.transmission}</td>
                                <td>{product.price}</td>
                                <td>{product.profit}</td>
                                <td>{product.stock}</td>
                                <td>{product.images}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button type="button" className="btn btn-success m-1" 
                                    onClick={()=> {handleClick(product)}}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button type="button" className="btn btn-danger m-1" onClick={()=>handleClickDelete(product.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <button type="button" className="btn btn-info m-1" onClick={()=> {handleClickDetails(product)}}>
                                        <i className="fa-solid fa-eye eye"></i>
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
    )
}

export default TableProduct;
