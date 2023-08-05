
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { DarkModeContext } from '../../Context/DarkModeContext';
import Button from '../../Components/Button';

const TableOthers = ({deleteCategorie, datasCategorie,openModalCreateCategorie,setEditCategorie, datasMark, openModalCreateMark, setEditMark, deleteModels, datasModels, openModalCreateModel,setEditModel, setTitle, deleteMarks}) => {

    const {darkMode} = useContext(DarkModeContext);

      /*  Categoria */    
    const handleClickEditCategorie =(categorie)=>
    {
        setEditCategorie(categorie);
        openModalCreateCategorie();
        setTitle('Editar Categoría');
    };

    const handleClickdeleteCategorie =(categorie)=>
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
              deleteCategorie(categorie);
            }
        })
    };

    const openCategorie=()=>{
        openModalCreateCategorie();
        setTitle('Crear Categoría');
    };

    /*  Mark */   

    const handleClickEditMark =(mark)=>
    {
        setEditMark(mark);
        openModalCreateMark();
        setTitle('Editar Marca');
    };

    const handleClickDeleteMark =(mark)=>
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
        openModalCreateMark();
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
                            <Button className={"btn btn-secondary addBtn" } onClick={openCategorie} text={<i className="fa-sharp fa-solid fa-circle-plus"></i>}/>
                            
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
                                    datasCategorie.length === 0 ? <tr><td colSpan="6" className="text-center">No hay datos</td></tr>
                                    :(datasCategorie.map)( categorie=> (
                                        <tr  key={categorie.id}>
                                            <td>{categorie.name}</td>
                                            <td>
                                                <Button className={"btn btn-success m-1"} onClick={handleClickEditCategorie} text={<i className="fa-solid fa-pen"></i>} item={categorie}/>
                                                
                                                <Button className={"btn btn-danger m-1"} onClick={handleClickdeleteCategorie} text={<i className="fa-solid fa-trash"></i>} item={categorie.id}/>

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
                                <Button className={"btn btn-secondary addBtn" } onClick={openMark} text={<i className="fa-sharp fa-solid fa-circle-plus btnAdd"></i>}/>
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
                                                <Button className={"btn btn-success m-1"} onClick={handleClickEditMark} text={<i className="fa-solid fa-pen"></i>} item={mark}/>

                                                <Button className={"btn btn-danger m-1"} onClick={handleClickDeleteMark} text={<i className="fa-solid fa-trash"></i>} item={mark.id}/>                           
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
                            <Button className={"btn btn-secondary addBtn"} onClick={openModel} text={ <i className="fa-sharp fa-solid fa-circle-plus btnAdd"></i>}/>
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
                                                <Button className={"btn btn-success m-1"} onClick={handleClickEditModel} item={model} text={<i className="fa-solid fa-pen"></i>}/>

                                                <Button className={"btn btn-danger m-1"} onClick={handleClickDeleteModel} item={model.id} text={<i className="fa-solid fa-trash"></i>}/>

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
