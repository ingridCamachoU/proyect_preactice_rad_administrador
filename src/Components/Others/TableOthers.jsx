
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../../Context/DarkModeContext';

const TableOthers = ({deleteCategoria, datasCategoria,openModalCreateCategoria,setEditCategoria, datasMark, openModalCreateMarca, setEditMark, deleteModels, datasModels, openModalCreateModel,setEditModel, setTitle, deleteMarks}) => {

    const {darkMode} = useContext(DarkModeContext);

      /*  Categoria */    
    const handleClickEditCategoria =(categoria)=>
    {
        setEditCategoria(categoria);
        openModalCreateCategoria();
        setTitle('Editar Categoría');
    };

    const handleClickDeleteCategoria =(categoria)=>
    {
        Swal.fire({
            title: 'Eliminar Categoría',
            text: "Está seguro de eliminar la Categoría?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'La Categoría ha sido eliminada.',
                'success'
                )
              deleteCategoria(categoria);
            }
        })
    };

    const openCategoria=()=>{
        openModalCreateCategoria();
        setTitle('Crear Categoría');
    };

    /*  Mark */   

    const handleClickEditMark =(mark)=>
    {
        setEditMark(mark);
        openModalCreateMarca();
        setTitle('Editar Marca');
    };

    const handleClickDeleteMarca =(mark)=>
    {
        Swal.fire({
            title: 'Eliminar Marca',
            text: "Está seguro de eliminar la Marca?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'La Marca ha sido eliminada.',
                'success'
                )
              deleteMarks(mark);
            }
        })
    };

    const openMark=()=>{
        openModalCreateMarca();
        setTitle('Crear Marca');
    };
  
    /*  Models */ 

    const handleClickEditModel =(model)=>
    {
        setEditModel(model);
        openModalCreateModel();
        setTitle('Editar Modelo');
    };

    const handleClickDeleteModel =(model)=>
    {
        Swal.fire({
            title: 'Eliminar Modelo',
            text: "Está seguro de eliminar el Modelo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El modelo ha sido eliminada.',
                'success'
                )
              deleteModels(model);
            }
        })
    };

    const openModel=()=>{
        openModalCreateModel();
        setTitle('Crear Modelo');
    };

  return (
        <>
            <div className="row tabla others">
            
                {/* table Category */}
                <div className="col-sm-4">
                    <div className="col table-responsive">
                        <div className="d-flex title">
                            <h4>Categoría</h4>
                            <button type="button" className="btn btn-secondary addBtn" onClick={openCategoria}>
                            <i className="fa-sharp fa-solid fa-circle-plus"></i>
                            </button>
                        </div>
                    
                        <table className={darkMode ? `table dark` : `table light`}>
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {   
                                    datasCategoria.length === 0 ? <tr><td colSpan="6" className="text-center">No hay datos</td></tr>
                                    :(datasCategoria.map)( categoria=> (
                                        <tr  key={categoria.id}>
                                            <td>{categoria.name}</td>
                                            <td>
                                                <button type="button" className="btn btn-success m-1" onClick={()=>handleClickEditCategoria(categoria)}>
                                                <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button type="button" className="btn btn-danger m-1" onClick={()=>handleClickDeleteCategoria(categoria.id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>    
                        </table>
                    </div>
                </div>

                 {/* table Mark */}
                <div className="col-sm-4">
                    <div className="col table-responsive">
                        <div className="d-flex title">
                                <h4>Marca</h4>
                                <button type="button" className="btn btn-secondary addBtn" onClick={openMark}>
                                <i className="fa-sharp fa-solid fa-circle-plus btnAdd"></i>
                                </button>
                            </div>
                        <table className={darkMode ? `table dark` : `table light`}>
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {   
                                    datasMark.length === 0 ? <tr><td colSpan="6" className="text-center">No hay datos</td></tr>
                                    :(datasMark.map)( mark=> (
                                        <tr  key={mark.id}>
                                            <td>{mark.name}</td>
                                            <td>
                                                <button type="button" className="btn btn-success m-1" onClick={()=>handleClickEditMark(mark)}>
                                                <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button type="button" className="btn btn-danger m-1" onClick={()=>handleClickDeleteMarca(mark.id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>    
                        </table>
                    </div>
                </div>

                 {/* table Model */}
                <div className="col-sm-4">
                    <div className="col table-responsive">
                        <div className="d-flex title">
                            <h4>Modelo</h4>
                            <button type="button" className="btn btn-secondary addBtn" onClick={openModel}>
                            <i className="fa-sharp fa-solid fa-circle-plus btnAdd"></i>
                            </button>
                            </div>
                        <table className={darkMode ? `table dark` : `table light`}>
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {   
                                    datasModels.length === 0 ? <tr><td colSpan="6" className="text-center">No hay datos</td></tr>
                                    :(datasModels.map)( model=> (
                                        <tr  key={model.id}>
                                            <td>{model.name}</td>
                                            <td>{model.mark.name}</td>
                                            <td>
                                                <button type="button" className="btn btn-success m-1" onClick={()=>handleClickEditModel(model)}>
                                                <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button type="button" className="btn btn-danger m-1" onClick={()=>handleClickDeleteModel(model.id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>    
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TableOthers;
