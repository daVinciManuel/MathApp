import { Link, Navigate, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Página no encontrada. ❌</h1>
      <button onClick={() => { navigate('/') }}>Volver al Inicio</button>
      <button onClick={() => { navigate(-1) }}>Volver atr&aacute;s</button>
    </main>
  )
}
export default NotFoundPage;
