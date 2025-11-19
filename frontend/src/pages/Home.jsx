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
import AppHeader from "../components/AppHeader";
import "./css/general.css";
import "./css/home.css";

const Home = () => {
  return (
    <>
      <AppHeader />
      <main id="home">
        <img src="/img/pinguino.png" alt="NaoMat" />
        <h1>Naomat</h1>
        <Link to="/game">
          <button>Empezar</button>
        </Link>
      </main>
    </>
  );
};

export default Home;
