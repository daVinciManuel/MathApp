import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <main>
      <h1>¡¡ Bienvenido a Naomat !!</h1>
      <img src="../public/img/logo1.png" />

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
