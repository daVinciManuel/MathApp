import { Link } from "react-router-dom";
import "./css/general.css";
import "./css/home.css";

const Home = () => {
  return (
    <main id="home">
      <img src="/img/pinguino.png" alt="NaoMat" />
      <h1>Naomat</h1>
      <Link to="/game">
        <button>Empezar</button>
      </Link>
      <Link to="/login" style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <button>Login 🔒</button>
      </Link>
    </main>
  );
};

export default Home;