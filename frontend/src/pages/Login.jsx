import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //   Datos formulario
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });
  //   Mensaje de respuesta del servidor
  const [message, setMessage] = useState("");
  // ---------- ------- ------------------------------

  // --------- guarda los datos del formulario en cada cambio
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // ----------- enviar la peticion ------------------
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
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      setMessage(res.data.message);
      if (res.status === 200) {
        navigate("/home");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };
  return (
    <main>
      <h1>Inicie sesión</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/* user  */}
          <label htmlFor="email">Email:</label>
          <br />
          <input type="text" name="email" id="email" onChange={handleChange} />
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
          />
          <br />
          <br />

          <button>Entrar</button>
        </form>

        <br />
        <br />

        {message ? <span>{message}</span> : <span></span>}
        <br />
        <br />

        <Link to="/registro">
          <button>Crear una cuenta</button>
        </Link>
      </div>
      <br />
      <br />
      <Link to="/">
        <button>Inicio</button>
      </Link>
    </main>
  );
};

export default Login;
