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