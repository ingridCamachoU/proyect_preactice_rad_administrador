
const Form = () => {
  return (
        <>
        <form action="">
            <label htmlFor="">Nombre</label>
            <input type="text" />

            <label htmlFor="">Apellido</label>
            <input type="text" />

            <label htmlFor="">Celular</label>
            <input type="text" />

            <label htmlFor="">Correo Electronico</label>
            <input type="email" />

            <label htmlFor="">Contraseña</label>
            <input type="password" />

            <input type="submit" />
            <input type="reset" />
            
        </form>
        </>
    );
}

export default Form;
