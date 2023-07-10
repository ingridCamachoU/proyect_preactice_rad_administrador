import { useState } from "react";

export const useModal = (initialValue= false) => {

    const [isOpenModalEditProduct, setIsOpenModalEditProduct] = useState(initialValue);
    const [isOpenModalProduct, setIsOpenModalProduct] = useState(initialValue);
    const [isOpenModalQuotation, setIsOpenModalQuotation] = useState(initialValue);
    const [isOpenProductDetailsModal, setIsOpenProductDetailsModal] = useState(initialValue);
    const openModalEditProduct= ()=>setIsOpenModalEditProduct(true);
    const closeModalEditProduct=()=> {setIsOpenModalEditProduct(false)};
    const openModalCreateProduct= ()=>setIsOpenModalProduct(true);
    const closeModalCreateProduct=()=> {setIsOpenModalProduct(false)};
    const openModalCreateQuotation= ()=>setIsOpenModalQuotation(true);
    const closeModalCreateQuotation=()=> {setIsOpenModalQuotation(false)};
    const openProductDetailsModal= ()=>setIsOpenProductDetailsModal(true);
    const closeProductDetailsModal=()=> {setIsOpenProductDetailsModal(false)};

  return [isOpenModalEditProduct, openModalEditProduct, closeModalEditProduct,isOpenModalProduct, openModalCreateProduct, closeModalCreateProduct, isOpenModalQuotation, openModalCreateQuotation, closeModalCreateQuotation, isOpenProductDetailsModal, openProductDetailsModal, closeProductDetailsModal];
};

