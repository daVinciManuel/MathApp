import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/logoutButton.css";

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      onLogout(); // limpiar estado del usuario en React
      // eliminar info de localStorage
      localStorage.removeItem('role');
      localStorage.removeItem('user');

      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Cerrar sesi&oacute;n
    </button>
  );
}

export default LogoutButton;
