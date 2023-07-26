import { useState } from "react";
import { useForm } from "../../hooks/useForm";

const FormQuotation = ({isOpenModalQuotation, closeModalCreateQuotation, datasProvider, addDataQuotation, editDataProduct, loadDatasQuotation}) => {

    const initialForm ={
        "product": "",
        "provider":"",
        "price": "" 
    };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let errors = {};
        let regexPrice = /^[0-9]+$/;

        if(!regexPrice.test(formData.price)){
            errors.price= 'El campo "Precio" no debe estar vacio.';
        }

        if (!formData.provider.trim()){
            errors.provider= 'El campo "Proveedor" no debe ser vacio.';
        }
        return errors;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err)

        formData.product= editDataProduct.id
        
        if (Object.keys(err).length === 0){
            if (formData.product !== '' && formData.provider !== ''  && formData.price !== '' ){
                    addDataQuotation(formData);
                    setFormData(initialForm);
                    closeModalCreateQuotation();
                }
        }else{
            setErrors(err);
        }
        setFormData(initialForm);
        console.log(editDataProduct)
        loadDatasQuotation(editDataProduct);
    };

    const close=()=>{
        handleReset();
        closeModalCreateQuotation();
        setFormData(initialForm);
    };

    const handleModalClick= e => e.stopPropagation();
    
  return (
    <>
         <div className={`modal modal-container ${isOpenModalQuotation &&"is-Open" }`} onClick={close}>
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content" >
                    <div className="modal-body" onClick={handleModalClick}>
                        <button className="modal-close p-1" onClick={close}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <form className=" p-3" onSubmit={handleSubmit} onReset={handleReset} >

                            <h2>Agregar cotización</h2>

                            <div className="row g-3 mt-4">
                                <div className="col-sm-6">
                                    <label className="form-label">Proveedor</label>
                                    <div>
                                        <select className="form-control" name="provider" onChange={handleChange} value={formData.provider} required>
                                        <option ></option>
                                        {datasProvider.map(provider => (
                                            <option key={provider.id} value={provider.id} >{provider.name}</option>
                                            ))}
                                        
                                        </select>
                                    </div>
                                    {errors.provider && <p className="text-danger">{errors.provider}</p>}
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">Precio</label>
                                    <input 
                                    className="form-control"
                                    type="number" name='price' required
                                    value={formData.price} 
                                    onChange={handleChange}/>
                                    {errors.price && <p className="text-danger">{errors.price}</p>}
                                </div>
                            </div> 

                            <div className="row g-3 mt-2">
                                <div className="col-sm-6">
                                    <label className="form-label">Descripción </label>
                                    <textarea 
                                    className="form-control" 
                                    type="text"/> 
                                </div>
                                <div className="col-sm-6">
                                    <div className="text-end mt-4">
                                        <input className="btn btn-outline-danger m-2 px-3" type="reset" value="Cancelar"  onClick={close}/>
                                        <input className="btn btn-outline-primary m-2" type="submit" value="Guardar"/>    
                                    </div>
                                </div>
                            </div>  

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default FormQuotation;
