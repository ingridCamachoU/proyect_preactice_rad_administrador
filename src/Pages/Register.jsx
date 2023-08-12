import { useState } from "react";
import { register } from "../config/firebase";
import { Link } from "react-router-dom";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../Context/UserContext";


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user} = useUserContext();
    useRedirectActiveUser(user, '/content')

    const handleEmail = (e) =>{
        setEmail(e.target.value);
    };

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log('clikc')
        try {
            const credentialUser= await register({email, password});
            console.log(credentialUser)
        } catch (error) {
            console.log(error);
        }

    };

  return (
    <div  className="container-xxl" style={{padding:0}}>     
    <div className="container-xxl" style={{padding:0}}>     
        <div className="login">
            <div className="form">
                <form className="formLogin row" onSubmit={handleSubmit}>
                    <h2 className="mb-5 text-center">Regístrate</h2>
                    <div className="col-sm-6">
                        <label className="form-label">Usuario</label>
                        <input type="text" value={email}onChange={handleEmail}  className="form-control inputLogin"  required/>
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label">Contraseña</label>
                        <input type="password" value={password} onChange={handlePassword} className="form-control inputLogin" required />
                    </div>

                    <div className="contButton">
                        <input type="submit" value="Regístrate" className="btnLogin" />
                    </div>

                    <p className="color mt-4 text-secondary">Ya tienes cuenta? <Link  to="/" className="register text-secondary">Iniciar Sesión</Link></p>

                </form>
                
            </div>
        </div>        
    </div>
</div>
    );
}

export default Register;
