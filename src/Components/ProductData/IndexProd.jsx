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

const IndexProd = () => {
    
    const [datasProduct, setDatasProduct] = useState([]);
    const [datasProvider, setDatasProvider] = useState([]);
    const [datasQuotation, setDatasQuotation] = useState([]);
    const [editDataProduct, setEditDataProduct] = useState(null);
    const  [isOpenModalEditProduct, openModalEditProduct, closeModalEditProduct,isOpenModalProduct, openModalCreateProduct, closeModalCreateProduct, isOpenModalQuotation, openModalCreateQuotation, closeModalCreateQuotation, isOpenProductDetailsModal, openProductDetailsModal, closeProductDetailsModal] = useModal(false);

    const {darkMode} = useContext(DarkModeContext);

    const urlProduct = "http://localhost:8000/api/v1/products/";

    /* Load Data product*/    
  const loadDatasProduct = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: urlProduct,
            headers: { },
            data : datasProduct
        };
        const response = await axios(config)
        setDatasProduct(response.data);
    };
        
    useEffect(() => {
        loadDatasProduct();
    }, []);

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
                url: (`${urlProduct}${editDataProduct.id}/`),
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
    
      const response = await axios(config)
      setDatasProvider(response.data);
    };

    useEffect(() => {
        loadDatasProvider();
    }, []);

    /* Load Quotation Data */   
    const  loadDatasQuotation= async(product)=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: (`http://localhost:8000/api/v1/products/${product.id}/quotations`),
            headers: { },
            data : datasQuotation
          };
          const response = await axios(config)
          setDatasQuotation(response.data);
    }

     /* Create new Quotation*/   
     const addDataQuotation = async (formData) => {
        console.log(formData)
        let id= formData.product;
        let data = JSON.stringify(formData);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: (`http://localhost:8000/api/v1/products/${id}/quotations/`),
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
            url: (`http://localhost:8000/api/v1/products/${editDataProduct.id}/quotations/${id}`),
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

    return (
        <section className={darkMode ? `contenedor dark` : `contenedor light`}>
            <div className="nav-contenedor">
                <h1 className="text-center">LISTA DE PRODUCTOS</h1>
                <button type="button" className="btn btn-secondary addBtn" onClick={openModalCreateProduct}>
                    <i className="fa-sharp fa-solid fa-circle-plus btnAdd"></i>
                </button>
            </div>
            <FormProduct addProduct={addProduct} isOpenModalProduct={isOpenModalProduct} closeModalCreateProduct={closeModalCreateProduct} />

            <FormEditProduct editDataProduct={editDataProduct}  editProduct={editProduct} setEditDataProduct= {setEditDataProduct}  isOpenModalEditProduct={isOpenModalEditProduct} closeModalEditProduct={closeModalEditProduct} openModalCreateQuotation={openModalCreateQuotation}  datasQuotation={datasQuotation} deletequotation={deletequotation}/>     

            <TableProduct datasProduct={datasProduct}  setEditDataProduct= {setEditDataProduct} deleteProduct={deleteProduct} openModalEditProduct={openModalEditProduct}  loadDatasQuotation={ loadDatasQuotation} addDataQuotation={addDataQuotation} openProductDetailsModal={openProductDetailsModal}/>

            <FormQuotation isOpenModalQuotation={isOpenModalQuotation} closeModalCreateQuotation={closeModalCreateQuotation} datasProvider={datasProvider} addDataQuotation={addDataQuotation} editDataProduct={editDataProduct} openModalEditProduct={openModalEditProduct} loadDatasQuotation={ loadDatasQuotation} />

            <ProductDetails closeProductDetailsModal={closeProductDetailsModal} isOpenProductDetailsModal={isOpenProductDetailsModal} datasQuotation={datasQuotation} editDataProduct={editDataProduct}/>
        </section>
    );
}

export default IndexProd;