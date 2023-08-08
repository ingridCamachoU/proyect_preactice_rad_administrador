import { useContext, useEffect, useState } from "react";
import FormProv from "./FormProv";
import TableProv from "./TableProv";
import axios from "axios";
import { useModal } from "../../hooks/useModal";
import Swal from 'sweetalert2';
import { DarkModeContext } from "../../Context/DarkModeContext";
import NabvarTitle from "../../Components/NabvarTitle";

const IndexProv = () => {

  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [title, setTitle]= useState('');

  const {darkMode} = useContext(DarkModeContext);

  const urlProv = `${process.env.REACT_APP_BASE_URL_}api/v1/providers/`;

    /* Load Data*/    
  const loadData = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: urlProv,
            headers: { },
            data : data
        };
        
        const response = await axios(config)
        setData(response.data);
    };

    useEffect(() => {
        loadData();
      }, []);
      
     /* Create new provider*/   
    const addData = async (formData) => {
        let data = JSON.stringify(formData);
 
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: urlProv,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        try {
            await axios(config);
            Swal.fire({
                text: 'Proveedor Agregado',
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
        loadData();
    };
    
     /*Edit provider*/  
    const editPRov= async (formData) =>{
        let data = JSON.stringify(formData);
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${urlProv}${editData.id}/`,
                headers: { 
                'Content-Type': 'application/json'
                },
                data : data
            };
        try {
            await axios(config);
            Swal.fire({
                text: 'Proveedor Editado con Éxito',
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
        loadData();
        setEditData(null);
    };

      /* Delete provider*/  
    const deleteProv= async(id)=>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${urlProv}${id}`,
            headers: { },
            data : data
          };
          
        try {
            await axios(config);
        } catch (error) {
            console.log(error);
            let erorCodigo= (error.response.data.code);
            Swal.fire({
                text: erorCodigo,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
        loadData();
    };

    const open=()=>{
        openModal();
        setTitle('Registrar Proveedor');
    };
 
  return (
        <section className={darkMode ? `contenedor dark` : `contenedor light`}>
            <NabvarTitle title={"Lista de Proveedores"} onClick={open}/>

            <FormProv isOpen={isOpen} closeModal={closeModal} addData={addData} editData={editData} editPRov={editPRov} title={title}/> 

            <TableProv data={data}  setEditData= {setEditData} deleteProv={deleteProv} openModal={openModal} setTitle={setTitle}/>
            
        </section>
    );
};

export default IndexProv;
