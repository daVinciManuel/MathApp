const EditProfileForm = () => {
  return (
    <form>
      <label>
        Nombre:
        <input type="text" placeholder="Tu nombre" />
      </label>

      <label>
        Email:
        <input type="email" placeholder="tu@email.com" />
      </label>

      <label>
        Contraseña:
        <input type="password" placeholder="Nueva contraseña" />
      </label>

      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default EditProfileForm;