import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import Button from "../../Components/Button";

const FormProduct = ({addProduct, isOpenModalProduct, closeModalCreateProduct, datasCategories, datasModels}) => {

    const initialForm ={
        "code": "",
        "name": "",
        "description": "",
        "price": "",
        "stock": "",
        "profit": "30",
        "category": "",
        "transmission": "",
        "mark_model": "",
        "images": [],
    };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let errors = {};
        let regexCode = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜüs]){5,20}$/;
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){5,20}$/;
        let regexDescription = /^.{1,50}$/;
        let regexPrice = /^[0-9]+$/;
        let regexStock = /^[0-9]+$/;

        if (!formData.code.trim()){
            errors.code= 'El campo "Código" no debe ser vacio.';
        }else if(!regexCode.test(formData.code)){
            errors.code= 'El campo "Código" es incorrecto, no puede tener espacios en blanco y debe tener más de 5 caracteres';
        }

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto debe tener más  de 5 caracteres.';
        }

        if (!formData.description.trim()){
            errors.description= 'El campo "Descripción" no debe ser vacio.';
        }else if(!regexDescription.test(formData.description)){
            errors.description= 'El campo "Descripción" debe tener de 5 hasta  50 caracteres.';
        }

        if(!regexPrice.test(formData.price)){
            errors.price= 'El campo "Precio" no debe estar vacio.';
        }

        if(!regexStock.test(formData.stock)){
            errors.stock= 'El campo "Stock" no debe estar vacio.';
        }
        return errors;
    };

    const err= onValidate(formData);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(err);        

        if (Object.keys(err).length === 0){
            addProduct(formData);
            closeModalCreateProduct();
            handleReset();
            setErrors('');
        } 
    };
    
    const handleModalClick= e => e.stopPropagation();

    const close=()=>{
        handleReset();
        closeModalCreateProduct(); 
        setErrors('');
    };

    const add=(e)=>{
        const {name, value}= e.target;
        setFormData({
            ...formData, 
            [name]:[value],
        });
    }
    
  return (
        <>
            <div className={`modal modal-container ${isOpenModalProduct &&"is-Open" }`} onClick={close}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body" onClick={handleModalClick}>
                            <Button className={"modal-close p-1"} onClick={close} text={ <i className="fa-solid fa-xmark"></i>}/>
                            
                            <form className=" p-3" onSubmit={handleSubmit} onReset={handleReset}>

                            <h2 className="pb-5">Crear Producto</h2>
                            <div className="row g-3">
                                <div className="col-sm-4">
                                    <label className="form-label">Código </label>
                                    <input 
                                    className="form-control" 
                                    type="text" required name='code' 
                                    value={formData.code} 
                                    onChange={handleChange} />
                                    {errors.code && <p className="text-danger">{errors.code}</p>}
                                </div>

                                <div className="col-sm-4">
                                    <label  className="form-label">Nombre</label>
                                    <input 
                                    className="form-control" 
                                    type="text" required name='name' 
                                    value={formData.name} 
                                    onChange={handleChange} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>

                                <div className="col-sm-4">
                                    <label  className="form-label">Categoría</label>
                                    <select className="form-control" name="category" onChange={handleChange} value={formData.category} required>
                                        <option ></option>
                                        {datasCategories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                    </select>
                                </div>
                            </div> 

                            <div className="row g-3 mt-4">

                                <div className="col-sm-4">
                                    <label  className="form-label">Precio</label>
                                    <input 
                                    className="form-control"
                                    type="number" name='price' required
                                    value={formData.price} 
                                    onChange={handleChange}/>
                                    {errors.price && <p className="text-danger">{errors.price}</p>}
                                </div>

                                <div className="col-sm-4">
                                    <label  className="form-label">% Ganancia</label>
                                    <input 
                                    className="form-control"
                                    type="number" name='profit' required
                                    value={formData.profit} 
                                    onChange={handleChange}/>
                                    {errors.profit && <p className="text-danger">{errors.profit}</p>}
                                </div>
                                
                                <div className="col-sm-4">
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
                                    <label className="form-label">Modelo</label>
                                    <select className="form-control" name="mark_model" onChange={handleChange} value={formData.mark_model}>
                                        <option ></option>
                                        {datasModels.map(mark_model => (
                                            <option key={mark_model.id} value={mark_model.id} >{mark_model.name} ({mark_model.mark.name})</option>
                                            ))}  
                                    </select>
                                </div>

                                <div className="col-sm-6">
                                    <label  className="form-label">Transmisión</label>
                                    <select className="form-control" name="transmission" onChange={handleChange} value={formData.transmission}>
                                        <option value=""></option>
                                        <option value="Automático">Automático</option>
                                        <option value="Mecánico">Mecánico</option>
                                    </select>
                                </div>
                            </div> 

                            <div className="row g-3 mt-4">
                                <div className="col-sm-6">
                                    <label  className="form-label">Imagenes</label>
                                    <textarea
                                    className="form-control" 
                                    type="text" name="images"
                                    value={formData.images} 
                                    onChange={add}/>
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">Descripción</label>
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
