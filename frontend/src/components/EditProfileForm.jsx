import styles from "./css/EditProfileForm.module.css";

const EditProfileForm = () => {
  return (
    <form className={styles.formContainer}>
      <div className={styles.inputGroup}>
        <label>Nombre</label>
        <input type="text" placeholder="Nombre de usuario" />
      </div><br/>

      <div className={styles.inputGroup}>
        <label>Email</label>
        <input type="email" placeholder="tu@email.com" />
      </div><br/>

      <div className={styles.inputGroup}>
        <label>Contraseña</label>
        <input type="password" placeholder="Nueva contraseña" />
      </div><br/>

      <button type="submit" className={styles.saveButton}>Guardar cambios</button>
    </form>
  );
};

export default EditProfileForm;