import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";


const FormModel = ({addModel,isOpenModel, closeModalModel, editModel, title, editDataModel, datasMark}) => {

    const initialForm ={
        "mark": "",
        "name": "",
    };

    const [formData, handleChange, handleReset, setFormData] = useForm (initialForm);

    const [errors, setErrors] = useState({});

    const onValidate = (formData)=>{
        let regexName = /^([0-9-A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]){5,20}$/;

        if (!formData.name.trim()){
            errors.name= 'El campo "Nombre" no debe ser vacio.';
        }else if(!regexName.test(formData.name)){
            errors.name= 'El campo "Nombre" es incorrecto.';
        }

        return errors;
    };

    useEffect(()=>{
        if( editDataModel !== null){
            const copyData = {
                "mark": editDataModel?.mark?.id,
                "name": editDataModel?.name,
            }
            setFormData(copyData);
        } else{
            setFormData(initialForm);
        }
    },[editDataModel]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const err= onValidate(formData);
        setErrors(err)

        if (Object.keys(err).length === 0){
             if(formData.name !== ''){
                    if (editDataModel !== null){
                        editModel(formData);
                        setFormData(initialForm);
                        closeModalModel();
                        
                    } else {
                        addModel(formData);
                        setFormData(initialForm);
                        closeModalModel();
                    }
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
        closeModalModel(); 
        setFormData(initialForm);
    };

  return (
        <>
            <div className={`modal modal-container ${isOpenModel &&"is-Open" }`} onClick={close}>
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body p-5" onClick={handleModalClick}>
                            <button className="modal-close px-1 m-4" onClick={close}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                            <form className=" p-3" onSubmit={handleSubmit} onReset={handleReset}>

                            <h2 className="pb-5">{title}</h2>
                            <div className="row g-3">
                            
                                <div className="col-sm-6">
                                    <label  className="form-label pb-3">Nombre</label>
                                    <input 
                                    className="form-control" 
                                    type="text" required name='name' 
                                    value={formData.name} 
                                    onChange={handleChange} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>

                                <div className="col-sm-6">
                                    <label  className="form-label pb-3">Marca</label>
                                    <select className="form-control" name="mark" onChange={handleChange} value={formData.mark} required>
                                        <option ></option>
                                        {datasMark.map(mark => (
                                            <option key={mark.id} value={mark.id}>{mark.name}</option>
                                            ))}
                                    </select>
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
    );
}

export default FormModel;
