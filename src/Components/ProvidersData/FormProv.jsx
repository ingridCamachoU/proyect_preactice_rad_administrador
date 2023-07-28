import { useEffect, useState} from "react";
import { useForm } from "../../hooks/useForm";

const FormProv = ({addData, editData, editPRov, isOpen, closeModal, title}) => {

    const initialForm= {    
    "nit": "",
    "name": "",
    "contact": "",
    "email": ""
    };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let errors = {};
        let regexNit =  /^[0-9]+$/;
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){2,20}$/;
        let regexContact =  /^[0-9]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

        if (!formData.nit.trim()){
            errors.nit= 'El campo "Nit" no debe ser vacio.';
        }else if(!regexNit.test(formData.nit)){
            errors.nit= 'El campo "Nit" es incorrecto, solo acepta números.';
        }

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        if (!formData.contact.trim()){
            errors.contact= 'El campo "Contacto" no debe ser vacio.';
        }else if(!regexContact.test(formData.contact)){
            errors.contact= 'El campo "Contacto" solo acepta números.';
        }

        if (!formData.email.trim()){
            errors.email= 'El campo "Email" no debe ser vacio.';
        }else if(!regexEmail.test(formData.email)){
            errors.email= 'El campo "Email" es incorrecto';
        }

        return errors;
    }

    useEffect(()=>{
        if( editData !== null){
            setFormData(editData);
        } else{
            setFormData(initialForm);
        }
    },[editData]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
            if (formData.nit !== '' && formData.name !== ''  && formData.contact !== '' && formData.email !== ''){
                if (editData !== null){
                    editPRov(formData);
                    setFormData(initialForm);
                    closeModal();
                    setErrors('');
                    
                } else {
                    addData(formData);
                    setFormData(initialForm);
                    closeModal();
                }
            } 
        }else{
            setErrors(err);
        }
    };

    const handleModalClick= e => e.stopPropagation();

    const close=()=>{
        closeModal();
        handleReset();
    };

  return (
        <>
            <div className={` modal modal-container ${isOpen &&"is-Open" }`} onClick={close}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body" onClick={handleModalClick}>
                            <button className="modal-close p-1" onClick={close}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                        <form className=" p-3" onSubmit={handleSubmit} onReset={handleReset}> 
            
                            <h2 className="pb-5">{title}</h2>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">Nit </label>
                                    <input 
                                    className="form-control" 
                                    type="number" required name='nit' 
                                    value={formData.nit} 
                                    onChange={handleChange} />
                                    {errors.nit && <p className="text-danger">{errors.nit}</p>}
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
                                    <label className="form-label">Contacto </label>
                                    <input  
                                    className="form-control" 
                                    type="number"  required name='contact'   
                                    value={formData.contact} 
                                    onChange={handleChange}/>
                                    {errors.contact && <p className="text-danger">{errors.contact}</p>}
                                </div>

                                <div className="col-sm-6">
                                    <label  className="form-label">Email</label>
                                    <input 
                                    className="form-control"
                                    type="email" name='email' required=""
                                    value={formData.email} 
                                    onChange={handleChange}/>
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                            </div> 
                            <div className="text-end mt-4">
                                <input className="btn btn-outline-danger m-2" type="reset" value="Cancelar" onClick={closeModal}/>
                                <input className="btn btn-outline-primary m-2" type="submit" value="Guardar"/>
                            </div>
                        </form>

                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
};

export default FormProv;
