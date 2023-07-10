import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

const ProductDetails = ({closeProductDetailsModal, isOpenProductDetailsModal, datasQuotation, editDataProduct}) => {

    const initialForm ={
        "code": "",
        "name": "",
        "description": "",
        "price": "",
        "stock": ""
    };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const handleModalClick= e => e.stopPropagation();

    const close=()=>{
        closeProductDetailsModal();
        handleReset();
    };

    useEffect(()=>{
        if( editDataProduct !== null){ 
            setFormData(editDataProduct);
        } else{
            setFormData(initialForm);
        }
    }, [editDataProduct]);


  return (
        <>
            <div className={`modal modal-container ${isOpenProductDetailsModal &&"is-Open" }`} onClick={close}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-contents">
                        <div className="modal-body " onClick={handleModalClick}>
                            <button className="modal-close p-1" onClick={close}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                            <section className="">
                                <h2 className="pb-3 mx-5">Detalles del producto</h2>
                                <div className="border p-4">
                                    <div className="row g-3">
                                        <div className="col-sm-4">
                                            <p className="text" name='code' 
                                            value={formData.code} onChange={handleChange}>Código </p>
                                            <p>{formData.code}</p>
                                        </div>

                                        <div className="col-sm-4">
                                            <p  className="text" name='name' 
                                            value={formData.name} onChange={handleChange}>Nombre</p>
                                            <p>{formData.name}</p>
                                        </div>

                                        <div className="col-sm-4">
                                            <p  className="text" name='price'
                                            value={formData.price} onChange={handleChange}>Precio</p>
                                            <p>{formData.price}</p>
                                        </div>
                                    </div> 

                                    <div className="row g-3 mt-4">
                                        
                                        <div className="col-sm-4">
                                            <p className="text" name='stock'   
                                            value={formData.stock} onChange={handleChange}>Stock</p>
                                            <p>{formData.stock}</p>
                                        </div>

                                        <div className="col-sm-4">
                                            <p className="text" name='description'   
                                            value={formData.description} onChange={handleChange}>Descripción </p>
                                            <p>{formData.description}</p>
                                        </div>
                                    </div> 

                                </div>   
                            </section> 

                            <section className="mt-5">
                                <h4 className="mx-5 pb-3">Cotizaciones</h4>
                                <table className="table border ">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Proveedor</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Descripción</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {   
                                        datasQuotation.length === 0 ? <tr><td colSpan="6" className="text-center">No hay cotizaciones</td></tr>
                                        :datasQuotation.map( quotation => (
                                            <tr key={quotation.id}>
                                                <td>{quotation.provider.name}</td>
                                                <td>{quotation.price}</td>
                                                <td>Descripcion</td>
                                            </tr>
                                        ))
                                    }
                                </tbody> 

                            </table>

                            </section>

                            
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default ProductDetails;
