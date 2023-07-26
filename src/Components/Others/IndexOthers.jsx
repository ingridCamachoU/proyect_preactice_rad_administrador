import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../Context/DarkModeContext";
import { useModal } from "../../hooks/useModal";
import './IndexOthers.css'
import Swal from 'sweetalert2';
import axios from "axios";
import TableOthers from "./TableOthers";
import FormCategoria from "./FormCategoria";
import FormModel from "./FormModel"
import FormMark from "./FormMark"

const IndexOthers = () => {

    const [datasCategoria, setDatasCategoria] = useState([]);
    const [datasMark, setDatasMark] = useState([]);
    const [datasModels, setDatasmodels] = useState([]);
    const [title, setTitle]= useState('');
    const [editDataCategoria, setEditCategoria] = useState(null);
    const [editDataMark, setEditMark] = useState(null);
    const [editDataModel, setEditModel] = useState(null);
    const [isOpenCategoria, openModalCreateCategoria, closeModalCategoria, isOpenMarca, openModalCreateMarca, closeModalMarca, isOpenModel, openModalCreateModel, closeModalModel] = useModal(false);

    const {darkMode} = useContext(DarkModeContext);

    const urlCategoria= 'http://localhost:8000/api/v1/categories/';

    /* Load categoria Data*/    
    const loadDatasCategoria = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: urlCategoria,
            headers: { },
            data : datasCategoria
        };
        try {
            const response = await axios(config)
            setDatasCategoria(response.data);

        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                Swal.fire({
                    icon: 'error',
                    title: 'Error 404',
                    text: 'Página no encontrada!',
                })
            }
            if (error.code === 'ERR_NETWORK'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!',
                })
            }
            
        }
    };

    useEffect(() => {
        loadDatasCategoria();
    }, []);

     /* Create new categoria*/   
     const addCategoria = async (formData) => {
        let data = JSON.stringify(formData);
 
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: urlCategoria,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        
        try {
            await axios(config);
            Swal.fire({
                text: 'Categoría Agregada',
                icon: 'success',
                confirmButtonText: 'Ok'
            });

        } catch (error) {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasCategoria();  
    };

     /*Edit categoria*/  
     const editCategoria= async (formData) =>{
        let data = JSON.stringify(formData);
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: (`${urlCategoria}${editDataCategoria.id}/`),
                headers: { 
                'Content-Type': 'application/json'
                },
                data : data
            };
        try {
            await axios(config);
            Swal.fire({
                text: 'Categoría editada con Éxito',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            
        } catch (error) {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasCategoria();
        setEditCategoria(null);
    };

    /* Delete categoria*/ 
    const deleteCategoria= async(id)=>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: (`${urlCategoria}${id}/`),
            headers: { },
            data : datasCategoria
          };
          
        try {
            await axios(config);
            
        } catch (error) {
            console.log(error.response.data.message);
            let erorCodigo= (error.response.data.message);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasCategoria();
    }

    /* ---------------------------------------------------------------------*/ 
    const urlMarks= 'http://localhost:8000/api/v1/marks/';

    /* Load marks Data*/    
    const loadDatasMarks = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: urlMarks,
            headers: { },
            data : datasMark
        };
        try {
            const response = await axios(config)
            setDatasMark(response.data);

        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                Swal.fire({
                    icon: 'error',
                    title: 'Error 404',
                    text: 'Página no encontrada!',
                })
            }
            if (error.code === 'ERR_NETWORK'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!',
                })
            }
            
        }
    };

    useEffect(() => {
        loadDatasMarks();
    }, []);

     /* Create new mark*/   
     const addMark = async (formData) => {
        let data = JSON.stringify(formData);
 
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: urlMarks,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        
        try {
            await axios(config);
            Swal.fire({
                text: 'Marca Agregada',
                icon: 'success',
                confirmButtonText: 'Ok'
            });

        } catch (error) {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasMarks();  
    };

     /*Edit Mark*/  
     const editMark= async (formData) =>{
        let data = JSON.stringify(formData);
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: (`${urlMarks}${editDataMark.id}/`),
                headers: { 
                'Content-Type': 'application/json'
                },
                data : data
            };
        try {
            await axios(config);
            Swal.fire({
                text: 'Marca editada con Éxito',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            
        } catch (error) {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasMarks();
        setEditMark(null);
    };

    /* Delete marks*/ 
    const deleteMarks= async(id)=>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: (`${urlMarks}${id}/`),
            headers: { },
            data : datasMark
          };
          
        try {
            await axios(config);
            
        } catch (error) {
            console.log(error.response.data.message);
            let erorCodigo= (error.response.data.message);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasMarks();
    }

    /* ---------------------------------------------------------------------*/ 
    const urlModels= 'http://localhost:8000/api/v1/models/';

    /* Load models Data*/    
    const loadDatasModels = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: urlModels,
            headers: { },
            data : datasModels
        };
        try {
            const response = await axios(config)
            setDatasmodels(response.data);

        } catch (error) {
            console.log(error);
            if (error.code === 'ERR_BAD_REQUEST'){
                Swal.fire({
                    icon: 'error',
                    title: 'Error 404',
                    text: 'Página no encontrada!',
                })
            }
            if (error.code === 'ERR_NETWORK'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salió mal, pero no te preocupes, no es tu culpa. Vamos a intentarlo de nuevo.!',
                })
            }
            
        }
    };

    useEffect(() => {
        loadDatasModels();
    }, []);

    /* Create new model*/   
    const addModel = async (formData) => {
        let data = JSON.stringify(formData);
 
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: urlModels,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        
        try {
            await axios(config);
            Swal.fire({
                text: 'Modelo Agregado',
                icon: 'success',
                confirmButtonText: 'Ok'
            });

        } catch (error) {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasModels();  
    };

    /*Edit Model*/  
    const editModel= async (formData) =>{
        let data = JSON.stringify(formData);
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: (`${urlModels}${editDataModel.id}/`),
                headers: { 
                'Content-Type': 'application/json'
                },
                data : data
            };
        try {
            await axios(config);
            Swal.fire({
                text: 'Modelo editado con Éxito',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            
        } catch (error) {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasModels();
        setEditModel(null);
    };

    /* Delete models*/ 
    const deleteModels= async(id)=>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: (`${urlModels}${id}/`),
            headers: { },
            data : datasCategoria
          };
          
        try {
            await axios(config);
            
        } catch (error) {
            console.log(error.response.data.message);
            let erorCodigo= (error.response.data.message);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadDatasModels();
    }

    return (
        <section className={darkMode ? `contenedor dark` : `contenedor light`}>
            <TableOthers deleteCategoria={deleteCategoria} datasCategoria={datasCategoria} deleteMarks={deleteMarks} datasMark={datasMark} deleteModels={deleteModels} datasModels={datasModels} openModalCreateCategoria={openModalCreateCategoria} openModalCreateMarca={openModalCreateMarca} openModalCreateModel={openModalCreateModel} setEditCategoria={setEditCategoria} setEditMark={setEditMark} setEditModel={setEditModel}   setTitle={setTitle} />

            <FormCategoria addCategoria={addCategoria} isOpenCategoria={isOpenCategoria} closeModalCategoria={closeModalCategoria} editCategoria={editCategoria} title={title} editDataCategoria={editDataCategoria}/>

            <FormModel addModel={addModel} isOpenModel={isOpenModel} closeModalModel={closeModalModel} editModel={editModel} title={title} editDataModel={editDataModel} datasMark={datasMark}/>

            <FormMark addMark={addMark} isOpenMarca={isOpenMarca} closeModalMarca={closeModalMarca} editMark={editMark} title={title} editDataMark={editDataMark}/>

        </section>
    );
}

export default IndexOthers;
