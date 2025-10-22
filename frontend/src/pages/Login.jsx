import { Link } from "react-router-dom"
const Login = () => {
    return (
        <main>
        <h1>Inicie sesión</h1>
        <div>
            {/* user  */}
            <label htmlFor="user">Usuario:</label><br />
            <input type="text" name="user" id="user" /><br /><br />

            {/* pass */}
            <label htmlFor="pass">Contrase&ntilde;a:</label><br />
            <input type="text" name="user" id="user" /><br /><br />

            <button>Entrar</button>
        </div>
        <Link to={"/"}>
            <button>Welcome page</button>
        </Link>
        </main>

    )
}

export default Login