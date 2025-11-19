import { useState } from "react";
import EditProfileForm from "../components/EditProfileForm";
import History from "../components/History";

const ProfileStudent = () => {
  const [section, setSection] = useState("history");

  return (
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
  );
};

export default ProfileStudent;