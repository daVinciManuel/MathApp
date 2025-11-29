import { Link } from "react-router-dom";
import "./css/welcome.css";
const Welcome = () => {
  return (
    <main id="welcome">
      <img src="/img/logo1.png" />

      <Link to="/game">
        <button type="button">Prueba una partida</button>
      </Link>
      <br />
      <Link to="/login">
        <button type="button">Login</button>
      </Link>
    </main>
  );
};

export default Welcome;
