import Button from "./Button";

const NabvarTitle = ({title, onClick}) => {
  return (
        <>
            <div className="nav-contenedor">
                <h1 className="text-center">{title}</h1>
                <Button className={"btn btn-secondary addBtn mt-2" } onClick={onClick} text={<i className="fa-sharp fa-solid fa-circle-plus"></i>}/>
            </div>
        </>
    )
}

export default NabvarTitle;
