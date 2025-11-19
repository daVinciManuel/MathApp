import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <main>
            <h1>Página no encontrada. ❌</h1>
            <Link to={"/"}>
                <button>Volver al Inicio</button>
            </Link>
        </main>
    )
}
export default NotFoundPage;