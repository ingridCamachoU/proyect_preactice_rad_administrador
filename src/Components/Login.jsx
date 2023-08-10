import { useState } from "react";
import Content from "./Content";

const Login = () => {
    const [login, setLogin] = useState("false");
    const [userLogin, setUserLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [userDisplay, setUserDisplay] = useState('')

    const handleUser = (e) => {
        setUserLogin(e.target.value);
    };

    const handlePassword = (e) => {
        setPasswordLogin(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById("formLogin").style.display="none"
        if ( userLogin === 'admin' && passwordLogin === '123456789'){
            setLogin('true');
            setUserDisplay(userLogin)
            setUserLogin("");
            setPasswordLogin("");
        }else{
            setLogin("false")
            alert("Error");
            setUserLogin("");
            setPasswordLogin("");
        }
    }

    console.log(userDisplay)

  return (
        <div  className="container-xxl" style={{padding:0}}>     
            <div id={"formLogin"} className="container-xxl" style={{padding:0}}>     
                <div className="login">
                    <div className="form">
                        <form className="formLogin row" onSubmit={handleSubmit} >
                            <h2 className="mb-5">Bievenido</h2>
                            <div className="col-sm-6">
                                <label className="form-label">Usuario</label>
                                <input type="text" className="form-control inputLogin" value={userLogin} required  onChange={handleUser}/>
                            </div>

                            <div className="col-sm-6">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control inputLogin" value={passwordLogin} required onChange={handlePassword}/>
                            </div>
                            
                            <div className="contButton">
                                <input type="submit" value="Login" className="btnLogin" />
                            </div>
                            
                        </form>
                    </div>
                </div>        
            </div>
        {login === 'true' && <Content userDisplay={userDisplay}  setLogin={setLogin}/>}
        </div>
    );
}

export default Login;
