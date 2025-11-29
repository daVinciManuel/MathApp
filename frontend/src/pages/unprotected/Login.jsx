import Modal from "@components/Modal";
import { useAuth } from "@core/context/authContext";
import { login } from "@core/services/authService";
import { trimObject } from "@core/utils/validations.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/general.css";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const { refetchUser } = useAuth();

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
  };

  // Enviar la peticion al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(trimObject(formData));

      setMessage(res.data.message);

      if (res.status === 200 && res.data.message === "login ok") {
        // Fetch user profile via refetchUser so it updates context before redirect
        await refetchUser();
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Error");
      setShowModal(true);
    }
  };

  return (
    <main id="login">
      <Modal
        isOpen={showModal}
        message={message}
        onClose={() => {
          setShowModal(false);
        }}
      />
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
