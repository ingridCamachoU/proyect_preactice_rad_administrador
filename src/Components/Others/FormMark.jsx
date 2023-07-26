import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";


const FormMark = ({addMark, isOpenMarca, closeModalMarca,editMark, title, editDataMark}) => {

    const initialForm ={
        "name": "",
    };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        return errors;
    };

    useEffect(()=>{
        if( editDataMark !== null){
            setFormData(editDataMark);
        } else{
            setFormData(initialForm);
        }
    },[editDataMark]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
             if(formData.name !== ''){
                    if (editDataMark !== null){
                        editMark(formData);
                        setFormData(initialForm);
                        closeModalMarca();
                        
                    } else {
                        addMark(formData);
                        setFormData(initialForm);
                        closeModalMarca();
                    }
                }
            } 
            else{
                setErrors(err);
            }
    };
    
    const handleModalClick= e => e.stopPropagation();

    const close=()=>{
        handleReset();
        closeModalMarca(); 
        setFormData(initialForm);
    };

  return (
        <>      
            <div className={`modal modal-container ${isOpenMarca &&"is-Open" }`} onClick={close}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body p-5" onClick={handleModalClick}>
                            <button className="modal-close px-1 m-4" onClick={close}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                            <form className=" p-3" onSubmit={handleSubmit} onReset={handleReset}>

                            <h2 className="pb-5">{title}</h2>
                            <div className="row g-3">
                            
                                <div className="col-sm-12">
                                    <label  className="form-label pb-3">Nombre</label>
                                    <input 
                                    className="form-control" 
                                    type="text" required name='name' 
                                    value={formData.name} 
                                    onChange={handleChange} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>

                            </div>

                            <div className="text-end mt-5">
                                <input className="btn btn-outline-danger m-2 " type="reset" value="Cancelar" onClick={close}/>
                                <input className="btn btn-outline-primary m-2" type="submit" value="Guardar"/>
                            </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) 
}

export default FormMark