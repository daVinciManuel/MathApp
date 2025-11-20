import { useState } from "react";
import EditProfileForm from "../components/EditProfileForm";
import History from "../components/History";

const ProfileStudent = () => {
  const [section, setSection] = useState("history");

  return (
    <>
      <main id="profile-student">
        <h1>Perfil Alumno</h1>

        <nav>
          <button onClick={() => setSection("history")}>Historial</button>
          <button onClick={() => setSection("editProfile")}>Cambiar datos</button>
        </nav>

        <section>
          {section === "history" && <History />}
          {section === "editProfile" && <EditProfileForm />}
        </section>
      </main>
    </>
  );
};

/*const ProfileStudent = () => {
  const [tab, setTab] = useState("progreso");

  return (
    <div>
      <div className="tabs">
        <a
          onClick={() => setTab("progreso")}
          className={tab === "progreso" ? "active" : ""}
        >
          Ejercicios en Progreso
        </a>
        <a
          onClick={() => setTab("historial")}
          className={tab === "historial" ? "active" : ""}
        >
          Historial de Partidas
        </a>
      </div>

      <div className="tab-content">
        {tab === "progreso" && <EjerciciosEnProgreso />}
        {tab === "historial" && <HistorialPartidas />}
      </div>
    </div>
  );
};*/

export default ProfileStudent;
