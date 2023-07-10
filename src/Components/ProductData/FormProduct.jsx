import { useState } from "react";
import { useForm } from "../../hooks/useForm";

const FormProduct = ({addProduct, isOpenModalProduct, closeModalCreateProduct}) => {

    const initialForm ={
        "code": "",
        "name": "",
        "description": "",
        "price": "",
        "stock": ""
    };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let errors = {};
        let regexCode = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜüs]){2,20}$/;
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;
        let regexDescription = /^.{1,50}$/;
        let regexPrice = /^[0-9]+$/;
        let regexStock = /^[0-9]+$/;

        if (!formData.code.trim()){
            errors.code= 'El campo "Código" no debe ser vacio.';
        }else if(!regexCode.test(formData.code)){
            errors.code= 'El campo "Código" es incorrecto, no puede tener espacios en blanco.';
        }

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        if (!formData.description.trim()){
            errors.description= 'El campo "Descripción" no debe ser vacio.';
        }else if(!regexDescription.test(formData.description)){
            errors.description= 'El campo "Descripción" acepta solo 50 caracteres.';
        }

        if(!regexPrice.test(formData.price)){
            errors.price= 'El campo "Precio" no debe estar vacio.';
        }

        if(!regexStock.test(formData.stock)){
            errors.stock= 'El campo "Stock" no debe estar vacio.';
        }
        return errors;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            if (formData.code !== '' && formData.name !== ''  && formData.description !== '' && formData.price !== '' && formData.stock !== '' ){
                    addProduct(formData);
                    closeModalCreateProduct();
                    setFormData(initialForm);
                }
            } 
            else{
                setErrors(err);
            }
            setFormData(initialForm);
    };
    
    const handleModalClick= e => e.stopPropagation();

    const close=()=>{
        handleReset();
        closeModalCreateProduct(); 
        setFormData(initialForm);
    };
    
  return (
        <>
            <div className={`modal modal-container ${isOpenModalProduct &&"is-Open" }`} onClick={close}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body" onClick={handleModalClick}>
                            <button className="modal-close p-1" onClick={close}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                            <form className=" p-3" onSubmit={handleSubmit} onReset={handleReset}>

                            <h2 className="pb-5">Crear Producto</h2>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">Código </label>
                                    <input 
                                    className="form-control" 
                                    type="text" required name='code' 
                                    value={formData.code} 
                                    onChange={handleChange} />
                                    {errors.code && <p className="text-danger">{errors.code}</p>}
                                </div>

                                <div className="col-sm-6">
                                    <label  className="form-label">Nombre</label>
                                    <input 
                                    className="form-control" 
                                    type="text" required name='name' 
                                    value={formData.name} 
                                    onChange={handleChange} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>
                            </div> 

                            <div className="row g-3 mt-4">
                                <div className="col-sm-6">
                                    <label  className="form-label">Precio</label>
                                    <input 
                                    className="form-control"
                                    type="number" name='price' required=""
                                    value={formData.price} 
                                    onChange={handleChange}/>
                                    {errors.price && <p className="text-danger">{errors.price}</p>}
                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label">Stock</label>
                                    <input  
                                    className="form-control" 
                                    type="number"  required name='stock'   
                                    value={formData.stock} 
                                    onChange={handleChange}/>
                                    {errors.stock && <p className="text-danger">{errors.stock}</p>}
                                </div>
                            </div> 

                            <div className="row g-3 mt-4">
                                <div className="col-sm-6">
                                    <label className="form-label">Descripción </label>
                                    <textarea 
                                    className="form-control" 
                                    type="text"  required name='description'   
                                    value={formData.description} 
                                    onChange={handleChange}/> 
                                    {errors.description && <p className="text-danger">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="text-end mt-4">
                                <input className="btn btn-outline-danger m-2" type="reset" value="Cancelar" onClick={close}/>
                                <input className="btn btn-outline-primary m-2" type="submit" value="Guardar"/>
                            </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default FormProduct;
