import { Link } from "react-router-dom";
import "./css/welcome.css"
const Welcome = () => {
  return (
    <main id="welcome">
      <h1>¡¡ Bienvenido a Naomat !!</h1>
      <img src="/img/logo1.png" />

      <Link to="/game">
        <button>Prueba una partida</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </main>
  );
};

export default Welcome;
