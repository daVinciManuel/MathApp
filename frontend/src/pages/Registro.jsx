import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registro = () => {
  // ---------- estados ------------------------------
  //   Datos formulario
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
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

  // envia los datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlEncoded = new URLSearchParams();
    for (const key in formData) {
      urlEncoded.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        urlEncoded,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
      if (err.response.data.error === "Validation error")
        setMessage("Usuario no diponible");
    }
  };

  return (
    <main>
      <h1>Crea su cuenta de Naomat</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <br />
          <input type="text" name="name" id="name" onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="lastname">Apellido:</label>
          <br />
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="age">Edad:</label>
          <br />
          <input
            type="number"
            name="age"
            id="age"
            min="0"
            max="150"
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="user">Correo electr&oacute;nico:</label>
          <br />
          <input type="text" name="email" id="user" onChange={handleChange} />
          <br />
          <br />

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

          <button>Crear cuenta</button>
        </form>
      </div>
      <br />
      <br />
      <p className="message">{message}</p>
      <p>
        <i>¿Ya tienes una cuenta?</i>
      </p>
      <Link to="/login">
        <button>Inicie sesi&oacute;n</button>
      </Link>
    </main>
  );
};

export default Registro;
