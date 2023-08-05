import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Button from "../../Components/Button";

const ProductDetails = ({closeProductDetailsModal, isOpenProductDetailsModal, datasQuotation, editDataProduct}) => {

    const initialForm ={
        "code": "",
        "name": "",
        "description": "",
        "price": "",
        "stock": "",
        "profit": "30",
        "category": "",
        "transmission": "",
        "mark_model":"",
        "images": [],
        };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const handleModalClick= e => e.stopPropagation();

    const close=()=>{
        closeProductDetailsModal();
        handleReset();
    };

    useEffect(()=>{
        if( editDataProduct !== null){ 
            const copyData = {
                "code": editDataProduct?.code,
                "name": editDataProduct?.name,
                "description": editDataProduct?.description,
                "price": editDataProduct?.price,
                "stock": editDataProduct?.stock,
                "profit": editDataProduct?.profit,
                "category": editDataProduct?.category?.name,
                "transmission": editDataProduct?.transmission,
                "mark_model": editDataProduct?.mark_model?.name,
                "images": editDataProduct?.images,
            }
            setFormData(copyData);
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
                            <Button className={"modal-close p-1"} onClick={close} text={<i className="fa-solid fa-xmark"></i>}/>

                            <section className="m-3">
                                <h2 className="mb-4">Detalles del producto</h2>
                                <div className="border p-4 px-3 details">

                                    <div className="row g-3">           
                                        <div className="col-sm-4">
                                            <p className="text text-center" name='code' 
                                            value={formData.code} onChange={handleChange}>Código </p>
                                            <p className="border text-center px-2">{formData.code}</p>
                                        </div>

                                        <div className="col-sm-4">
                                            <p  className="text text-center" name='name' 
                                            value={formData.name} onChange={handleChange}>Nombre</p>
                                            <p className="border text-center px-2">{formData.name}</p>
                                        </div>

                                        <div className="col-sm-4">
                                            <p  className="text text-center" name='category'
                                            value={formData.category} onChange={handleChange}>Categoria</p>
                                            <p className="border text-center px-2">{formData.category}</p>
                                        </div>
                                    </div> 

                                    <div className="row g-3">
                                        <div className="col-sm-4">
                                            <p className="text text-center " name='price' 
                                            value={formData.price} onChange={handleChange}>Precio</p>
                                            <p className="border text-center px-2">{formData.price}</p>
                                        </div>

                                        <div className="col-sm-4">
                                            <p  className="text text-center" name='profit' 
                                            value={formData.profit} onChange={handleChange}>% Ganancia</p>
                                            <p className="border text-center px-2">{formData.profit}</p>
                                        </div>

                                        <div className="col-sm-4">
                                            <p  className="text text-center" name='stock'
                                            value={formData.stock} onChange={handleChange}>Stock</p>
                                            <p className="border text-center px-2">{formData.stock}</p>
                                        </div>
                                    </div> 

                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <p className="text text-center " name='mark_model' 
                                            value={formData.mark_model} onChange={handleChange}>Modelo</p>
                                            <p className="border text-center px-2">{formData.mark_model}</p>
                                        </div>

                                        <div className="col-sm-6">
                                            <p  className="text text-center" name='transmission' 
                                            value={formData.transmission} onChange={handleChange}>Transmisión</p>
                                            <p className="border text-center px-2">{formData.transmission}</p>
                                        </div>
                                    </div> 

                                    <div className="row g-3">
                                        <div className="col-sm-12">
                                            <p className="text " name='images' 
                                            value={formData.images} onChange={handleChange}>Imagenes</p>
                                            <div className="d-flex h-auto">
                                                <p className="border p-2">{formData.images}</p>
                                            </div>
                                            
                                        </div>
                                    </div> 
                                    <div className="row g-3">
                                        <div className="col-sm-12">
                                            <p  className="text" name='description' 
                                            value={formData.description} onChange={handleChange}>Descripción</p>
                                            <div >
                                                <p className="border p-2">{formData.description}</p>
                                            </div>
                                        </div>
                                    </div> 
                                </div>   
                            </section> 


                            <div className="row tabla mt-2">
                                <div className="col table-responsive">
                                    <section className="mt-3">
                                        <h4 className="mb-4">Listado de Cotizaciones</h4>
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
                                                            <td>{quotation.description}</td>
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
                </div>
            </div>

        </> 
    );
}

export default ProductDetails;
