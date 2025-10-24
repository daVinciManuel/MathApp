/*import { Link } from "react-router-dom"
const Login = () => {
    return (
        <main>
        <h1>Inicie sesión</h1>
        <div>
            {/* user  }
            <label htmlFor="user">Usuario:</label><br />
            <input type="text" name="user" id="user" /><br /><br />

            {/* pass }
            <label htmlFor="pass">Contrase&ntilde;a:</label><br />
            <input type="text" name="user" id="user" /><br /><br />
            
            <Link to={"/home"}>
                <button>Entrar</button>
            </Link>
        </div>
        <Link to={"/"}>
            <button>Welcome page</button>
        </Link>
        </main>

    )
}

export default Login*/

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main>
      <h1>Inicie sesión</h1>
      <label htmlFor="user">Usuario:</label><br />
      <input type="text" id="user" /><br /><br />
      <label htmlFor="pass">Contraseña:</label><br />
      <input type="password" id="pass" /><br /><br />
      <Link to="/home">
        <button>Entrar</button>
      </Link>
      <br /><br />
      <Link to="/">
        <button>Welcome Page</button>
      </Link>
    </main>
  );
};

export default Login;
