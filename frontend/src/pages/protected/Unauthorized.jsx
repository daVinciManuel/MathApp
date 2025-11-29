// pages/Unauthorized.jsx
import { Link } from "react-router-dom";
import "./css/unauthorized.css"; // <-- import the CSS file

export default function Unauthorized() {
  return (
    <div className="unauth-container">
      <div className="unauth-card">
        <h1 className="unauth-code">403</h1>

        <h2 className="unauth-title">Acceso Denegado</h2>

        <p className="unauth-message">
          No tienes permisos para acceder a esta página.
        </p>

        <div className="unauth-buttons">
          <Link className="unauth-btn primary" to="/dashboard">
            Ir al Dashboard
          </Link>

          <Link className="unauth-btn secondary" to="/">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
