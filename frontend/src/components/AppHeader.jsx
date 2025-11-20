import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/header.css";
import LogoutButton from "./LogoutButton";

function AppHeader({ navigate }) {
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
      <img src="/img/logo.png" width='80px'
        onClick={() => navigate('/')}
      />
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

          <button onClick={() => navigate("/profile/student")}>Perfil</button>
          <button onClick={() => navigate('/login')}>Iniciar sesi&oacute;n</button>
        </>
      )}
    </header>
  );
}

export default AppHeader;
