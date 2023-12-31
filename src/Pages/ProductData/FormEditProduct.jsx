import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import Swal from 'sweetalert2';
import Button from "../../Components/Button";

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
    
const FormEditProduct = ({editDataProduct, editProduct, setEditDataProduct, isOpenModalEditProduct, closeModalEditProduct,openModalCreateQuotation, datasQuotation, deletequotation, datasModels, datasCategories}) => {

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

    useEffect(()=>{
        if( editDataProduct !== null){ 
            const copyData = {
                "code": editDataProduct?.code,
                "name": editDataProduct?.name,
                "description": editDataProduct?.description,
                "price": editDataProduct?.price,
                "stock": editDataProduct?.stock,
                "profit": editDataProduct?.profit,
                "category": editDataProduct?.category?.id,
                "transmission": editDataProduct?.transmission,
                "mark_model": editDataProduct?.mark_model?.id,
                "images": editDataProduct?.images,
            }
            setFormData(copyData);
        } else{
            setFormData(initialForm);
        }
    }, [editDataProduct]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            if (formData.code !== '' && formData.name !== ''  && formData.description !== '' && formData.price !== '' && formData.stock !== '' && formData.category !== ''){
                 if (editDataProduct !== null ){
                    editProduct(formData);
                    setFormData(initialForm);
                    closeModalEditProduct();
                } else {
                    setFormData(initialForm);
                    closeModalEditProduct();
                }
            } 
        }else{
            setErrors(err);
        }
    }

    const handleModalClick= e => e.stopPropagation();

    const close=()=>{
        closeModalEditProduct();
        handleReset();
        setEditDataProduct(null);
    };

    const handleClickCotizar =()=>
    {
        openModalCreateQuotation();
        closeModalEditProduct();
    };

    const add=(e)=>{
        const {name, value}= e.target;
        setFormData({
            ...formData, 
            [name]:[value],
        });
    }
    
    const handleClickDelete =(quotation)=>
    {
        Swal.fire({
            title: 'Eliminar Cotización',
            text: "Está seguro de eliminar la cotización?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'La cotización ha sido eliminada.',
                'success'
                )
                deletequotation(quotation);
            }
        })
    };

  return (
        <>
            <div className={`modal modal-container ${isOpenModalEditProduct &&"is-Open" }`} onClick={close}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-body" onClick={handleModalClick}>
                        <Button className={"modal-close p-1"} onClick={close} text={ <i className="fa-solid fa-xmark"></i>}/>
                        
                        <form className=" p-3" onSubmit={handleSubmit} onReset={handleReset}>
                            <h2>Editar Producto</h2>
                            <div className="row g-3 mt-4">
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
                                    <label  className="form-label">Categoria</label>
                                    <select className="form-control" name="category" onChange={handleChange} value={formData.category}>
                                        <option ></option>
                                        {datasCategories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                    </select>
                                </div>
                            </div> 
       
                            <div className="row g-3 mt-2">
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
                                    <label className="form-label">% Ganancia</label>
                                    <input  
                                    className="form-control" 
                                    type="number"  required name='profit'   
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

                            <div className="row g-3 mt-2">
                                <div className="col-sm-6">
                                    <label  className="form-label">Modelo</label>
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

                            <div className="row g-3 mt-2">
                                <div className="col-sm-6">
                                    <label className="form-label">Imagenes</label>
                                    <textarea 
                                    className="form-control" 
                                    type="text" name='images'   
                                    value={formData.images} 
                                    onChange={add}/>
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label">Descripción </label>
                                    <textarea 
                                    className="form-control" 
                                    type="text"  required name='description'   
                                    value={formData.description} 
                                    onChange={handleChange}/> 
                                    {errors.description && <p className="text-danger">{errors.description}</p>}
                                </div>

                                <div className="col-sm-6">
                                    <div className="text-end mt-2">
                                        <input className="btn btn-outline-primary m-2" type="submit" value="Guardar"/>
                                        
                                        <input className="btn btn-outline-success m-2 px-3" type="button" value="Cotizar" onClick={()=> {handleClickCotizar(formData.id)}} />
                                    </div>
                                </div>
                            </div>
                        </form> 

                        <div className="row tabla mt-2">
                            <div className="col table-responsive">
                                <h4 className="mb-4">Registro de Cotizaciones</h4>
                                <table className="table">
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
                                            datasQuotation.length === 0 ? <tr><td colSpan="6" className="text-center">No hay cotizaciones</td></tr>
                                            :datasQuotation.map( quotation => (
                                                <tr key={quotation.id}>
                                                    <td>{quotation.provider.name}</td>
                                                    <td>{quotation.price}</td>
                                                    <td>Descripcion</td>
                                                    <td>
                                                    <Button className={"btn btn-danger m-1"} onClick={handleClickDelete} text={<i className="fa-solid fa-trash"></i>}/>             
                                                    </td>
                                                </tr>
                                            ))
                                        }
                
                                    </tbody> 
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </> 
    );
}

export default FormEditProduct;
