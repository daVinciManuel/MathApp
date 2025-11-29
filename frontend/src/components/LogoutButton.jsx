import { useAuth } from "@core/context/authContext";
import { logout } from "@core/services/authService";
import { useNavigate } from "react-router-dom";
import "./css/logoutButton.css";

function LogoutButton(position) {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // eliminar info de localStorage
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      // elimina info del estado
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-btn"
      style={position.position}
    >
      Cerrar sesi&oacute;n
    </button>
  );
}

export default LogoutButton;
