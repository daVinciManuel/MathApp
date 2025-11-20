import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/general.css";
import { useAuth } from "../context/authContext";
const Login = () => {
  const [showGhost, setShowGhost] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Datos formulario
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  // Mensaje de respuesta del servidor
  const [message, setMessage] = useState("");

  // Guarda los datos del formulario en cada cambio
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setShowGhost(!showGhost);
  };

  // Enviar la peticion al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlEncoded = new URLSearchParams();
    for (const key in formData) {
      urlEncoded.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        // "https://mathapp-ug8r.onrender.com/api/auth/login",
        urlEncoded,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      /*const userData = res.data.user;
      if (res.status === 200 && userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      }*/

      setMessage(res.data.message);

      if (res.status === 200 && res.data.user) {
        // Guardar usuario y rol
        setUser(res.data.user.dataValues);
        localStorage.setItem("user", JSON.stringify(res.data.user.dataValues));
        localStorage.setItem("role", res.data.user.dataValues.role); // "student" o "teacher"

        navigate('/dashboard');
        // Redirigir según rol
        // if (res.data.user.dataValues.role === "teacher") {
        //   navigate("profile/teacher");
        // } else {
        //   navigate("profile/student");
        // }
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <main id="login">
      <h1>Inicie sesión</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/* email  */}
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            required
          />
          <br />
          <br />

          {/* pass */}
          <label htmlFor="pass">Contrase&ntilde;a:</label>
          <br />
          <input
            type="password"
            name="pass"
            id="pass"
            onChange={handleChange}
            required
          />
          <br />
          <br />

          <button>Entrar</button>
        </form>

        <p className="message">{message}</p>
        <br />
        <br />

        <Link to="/registro">
          <button>Crear una cuenta</button>
        </Link>
      </div>
      <br />
      <br />
    </main>
  );
};

export default Login;
