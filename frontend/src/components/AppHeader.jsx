import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/header.css";
import LogoutButton from "./LogoutButton";

function AppHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null); // not logged in
      });
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <>
          <div className="user-info">
            Usuario: <strong>{user.name}</strong>
          </div>
          <LogoutButton
            onLogout={() => {
              setUser(null);
            }}
          />
        </>
      ) : (
        <>
          <Link to="/Login">
            <button>Iniciar sesi&oacute;n</button>
          </Link>
        </>
      )}
    </header>
  );
}

export default AppHeader;
