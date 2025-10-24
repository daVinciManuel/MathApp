/*import { Link } from "react-router-dom"
const Welcome = () => {
    return (
        <main>
            <h1>Welcome!</h1>
            <Link to={"/login"}>
            <button>Login</button>
            </Link>

            {/* Esto es un comentario}
        </main>
    )
}

export default Welcome*/
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <main>
      <h1>Welcome!</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </main>
  );
};

export default Welcome;
