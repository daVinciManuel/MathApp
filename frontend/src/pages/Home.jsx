/*import { Link } from "react-router-dom";
import "./css/general.css";
import "./css/home.css";

const Home = () => {
  return (
    <main id="home">
        <h1>Bienvenida a MathApp 🎉</h1>
        <p>Repasa matemáticas jugando, ¡Serás todo un crack!</p>
        <Link to="/menu">
            <a className="btn">Empezar</a>
        </Link>
    </main>
  );
};

export default Home;*/
import { Link } from "react-router-dom";
import "./css/general.css";
import "./css/home.css";
import pinguin from "../assets/img/pinguino.png"; // usa tu imagen de perro aquí

const Home = () => {
  return (
    <main id="home">
      <img src={pinguin} alt="Naomat" />
      <h1>Naomat</h1>
      <Link to="/game">
        <button>Start</button>
      </Link>
      <Link to="/login" style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <button>Login 🔒</button>
      </Link>
    </main>
  );
};

export default Home;
