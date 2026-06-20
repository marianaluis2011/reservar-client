import { useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa"; // ✅ Iconos
import "./error.css";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-box">
        <h1 className="error-code">404</h1>
        <h2 className="error-subtitle">Página no encontrada</h2>
        <p className="error-message">
          Lo sentimos, la ruta que intentaste visitar no existe o fue movida.
        </p>
        <div className="error-buttons">
          <button className="error-btn primary" onClick={() => navigate("/")}>
            <FaHome /> Volver al inicio
          </button>
          <button className="error-btn secondary" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
