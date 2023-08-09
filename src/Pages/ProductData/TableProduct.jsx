import { useContext } from 'react';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../../Context/DarkModeContext';
import Button from '../../Components/Button';

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
            <div className="col table-responsive" style={{padding: 0}}>
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
                                {
                                    product.mark_model === '' ? <td>--</td> : <td>{product.mark_model?.name} ({product.mark_model?.mark?.name})</td>
                                }
                                
                                {
                                    product.transmission === '' ? <td>--</td> : <td>{product.transmission}</td>
                                }
                                
                                <td>{product.price}</td>
                                <td>{product.profit}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <Button className={"btn btn-success m-1"} text={<i className="fa-solid fa-pen"></i>} onClick={handleClick} item={product}/>

                                    <Button className={"btn btn-danger m-1"} text={<i className="fa-solid fa-trash"></i>} onClick={handleClickDelete} item={product.id}/>

                                    <Button className={"btn btn-info m-1"} text={<i className="fa-solid fa-eye eye"></i>} onClick={handleClickDetails} item={product}/>

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
