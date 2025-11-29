import EditProfileForm from "@/components/EditProfileForm";
import { useState } from "react";
import MyGames from "./MyGames";

const ProfileTeacher = () => {
  const [section, setSection] = useState("myGames");

  return (
    <main id="profile-teacher">
      <h1>Perfil Profesor</h1>

      <nav>
        <button onClick={() => setSection("myGames")}>Mis juegos</button>
        <button onClick={() => setSection("editProfile")}>Cambiar datos</button>
      </nav>

      <section>
        {section === "myGames" && <MyGames />}
        {section === "editProfile" && <EditProfileForm />}
      </section>
    </main>
  );
};

export default ProfileTeacher;
