import Modal from "@components/Modal";
import { register } from "@core/services/authService";
import { useState } from "react";

const Registro = () => {
  // plantilla del formulario
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
    pass: "",
    role: "",
  });
  // Mensaje de respuesta del servidor
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  // Guarda los datos del formulario en cada cambio
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Envia los datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      setMessage(res.data.message);
      setShowModal(true);
    } catch (err) {
      setMessage(err.message);
      if (err.response?.data?.error === "Validation error")
        setMessage("Usuario no diponible");
      setShowModal(true);
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
          Rol:
          <br />
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              name="role"
              value="teacher"
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            />{" "}
            Profesor
          </label>
          <br />
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              name="role"
              value="student"
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            />{" "}
            Estudiante
          </label>
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
      <Modal
        isOpen={showModal}
        message={message}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </main>
  );
};
export default Registro;
