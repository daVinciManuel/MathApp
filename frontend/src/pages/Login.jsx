import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main>
      <h1>Inicie sesión</h1>
      <div>
        {/* user  */}
        <label htmlFor="user">Usuario:</label>
        <br />
        <input type="text" name="user" id="user" />
        <br />
        <br />

        {/* pass */}
        <label htmlFor="pass">Contrase&ntilde;a:</label>
        <br />
        <input type="password" name="pass" id="pass" />
        <br />
        <br />

        <Link to="/home">
          <button>Entrar</button>
        </Link>
      </div>
      <br />
      <br />
      <Link to="/">
        <button>Inicio</button>
      </Link>
    </main>
  );
};

export default Login;
