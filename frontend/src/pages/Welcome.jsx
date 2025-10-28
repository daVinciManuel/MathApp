import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <main>
      <h1>¡¡ Bienvenido a Naomat !!</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </main>
  );
};

export default Welcome;