import { useContext, useEffect, useState } from "react";
import TableProduct from "./TableProduct";
import FormProduct from "./FormProduct";
import axios from "axios";
import { useModal } from "../../hooks/useModal";
import Swal from 'sweetalert2';
import FormEditProduct from "./FormEditProduct";
import FormQuotation from "./FormQuotation";
import ProductDetails from "./ProductDetails";
import { DarkModeContext } from "../../Context/DarkModeContext";
import NabvarTitle from "../../Components/NabvarTitle";

const IndexProd = () => {
    
    const [search, setSearch] = useState('');
    const [datasProduct, setDatasProduct] = useState([]);
    const [datasProvider, setDatasProvider] = useState([]);
    const [datasQuotation, setDatasQuotation] = useState([]);
    const [datasCategories, setDatasCategories] = useState([]);
    const [datasModels, setDatasModels] = useState([]);
    const [editDataProduct, setEditDataProduct] = useState(null);
    const  [isOpenModalEditProduct, openModalEditProduct, closeModalEditProduct,isOpenModalProduct, openModalCreateProduct, closeModalCreateProduct, isOpenModalQuotation, openModalCreateQuotation, closeModalCreateQuotation, isOpenProductDetailsModal, openProductDetailsModal, closeProductDetailsModal] = useModal(false);

    const {darkMode} = useContext(DarkModeContext);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const urlProduct = `${process.env.REACT_APP_BASE_URL_}api/v1/products/`;
    const urlProducts = `${process.env.REACT_APP_BASE_URL_}api/v1/products/?search=${search}`;
    
    /* Load product Data*/    
  const loadDatasProduct = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: urlProducts,
            headers: { },
            data : datasProduct
        };
        try {
            const response = await axios(config)
            setDatasProduct(response.data);

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
        loadDatasProduct();
    },[urlProducts]);

     /* Create new product*/   
    const addProduct = async (formData) => {
        let data = JSON.stringify(formData);
 
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: urlProduct,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        
        try {
            await axios(config);
            Swal.fire({
                text: 'Producto Agregado',
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
        loadDatasProduct();  
    };
    
     /*Edit product*/  
    const editProduct= async (formData) =>{
        let data = JSON.stringify(formData);
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${urlProduct}${editDataProduct.id}/`,
                headers: { 
                'Content-Type': 'application/json'
                },
                data : data
            };
        try {
            await axios(config);
            Swal.fire({
                text: 'Producto Editado con Éxito',
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
        loadDatasProduct();
        setEditDataProduct(null);
    };

      /* Delete product*/  
    const deleteProduct= async(id)=>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: (`${urlProduct}${id}/`),
            headers: { },
            data : datasProduct
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
        loadDatasProduct();
    }

    /* Load provider data for create quotation */   
    const loadDatasProvider = async () => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: "http://localhost:8000/api/v1/providers/",
          headers: { },
          data : datasProvider
        };
        try {
            const response = await axios(config)
            setDatasProvider(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadDatasProvider();
    },[]);

    /* Load Quotation Data */   
    const  loadDatasQuotation= async(product)=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: (`http://localhost:8000/api/v1/products/${product.id}/quotations/`),
            headers: { },
            data : datasQuotation
          };
          try {
            const response = await axios(config)
            setDatasQuotation(response.data);

        } catch (error) {
            console.log(error);
        }  
    }

     /* Create new Quotation*/   
     const addDataQuotation = async (formData) => {
        console.log(formData)
        let id = formData.product;
        let data = JSON.stringify(formData);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${urlProduct}${id}/quotations/`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        try {
            await axios(config);
            Swal.fire({
                text: 'Cotización Agregada',
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
        loadDatasQuotation(editDataProduct);
    };

     /* Delete Quotation*/  
     const deletequotation= async(id)=>{
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${urlProduct}${editDataProduct.id}/quotations/${id}/`,
            headers: { },
            data : datasProduct
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
        loadDatasQuotation(editDataProduct);
    }

    /* Load categories data*/      
    const loadDatasCategories = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL_}api/v1/categories/`,
            headers: { },
            data : datasCategories
        };
        try {
            const response = await axios(config)
            setDatasCategories(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadDatasCategories();
    },[]);

     /* Load Models data*/      
    const loadDatasModels = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL_}api/v1/models/`,
            headers: { },
            data : datasModels
        };
        try {
            const response = await axios(config)
            setDatasModels(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadDatasModels();
    },[]);

    return (
        <section className={darkMode ? `contenedor dark` : `contenedor light`}>
             <NabvarTitle title={"Lista de Productos"} onClick={openModalCreateProduct}/>
             <div className="contSearch">
                <input value={search} className="search" type="search" placeholder="Search" onChange={handleSearch}/>
            </div>

            <FormProduct addProduct={addProduct} isOpenModalProduct={isOpenModalProduct} closeModalCreateProduct={closeModalCreateProduct} datasCategories={datasCategories} datasModels={datasModels}/>

            <FormEditProduct editDataProduct={editDataProduct}  editProduct={editProduct} setEditDataProduct= {setEditDataProduct}  isOpenModalEditProduct={isOpenModalEditProduct} closeModalEditProduct={closeModalEditProduct} openModalCreateQuotation={openModalCreateQuotation}  datasQuotation={datasQuotation} deletequotation={deletequotation}datasCategories={datasCategories} datasModels={datasModels}/>     

            <TableProduct datasProduct={datasProduct}  setEditDataProduct= {setEditDataProduct} deleteProduct={deleteProduct} openModalEditProduct={openModalEditProduct}  loadDatasQuotation={ loadDatasQuotation} addDataQuotation={addDataQuotation} openProductDetailsModal={openProductDetailsModal} datasQuotation={datasQuotation}/>

            <FormQuotation isOpenModalQuotation={isOpenModalQuotation} closeModalCreateQuotation={closeModalCreateQuotation} datasProvider={datasProvider} addDataQuotation={addDataQuotation} editDataProduct={editDataProduct} loadDatasQuotation={ loadDatasQuotation} />

            <ProductDetails closeProductDetailsModal={closeProductDetailsModal} isOpenProductDetailsModal={isOpenProductDetailsModal} datasQuotation={datasQuotation} editDataProduct={editDataProduct} datasProduct={datasProduct} />
        </section>
    );
}

export default IndexProd;
