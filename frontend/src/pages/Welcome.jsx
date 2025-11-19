import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
const Welcome = () => {
  return (
    <>
      <AppHeader />
      <main>
        <h1>¡¡ Bienvenido a Naomat !!</h1>
        <Link to="/game">
          <button>Prueba una partida</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </main>
    </>
  );
};

export default Welcome;
