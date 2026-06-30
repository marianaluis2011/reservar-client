import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings } from "../../services/booking.services.js";
import { toast } from "sonner";
import "./MyBooking.css";

const formatFecha = (iso) => {
  if (!iso) return "-";
  return iso.slice(0, 10).split("-").reverse().join("/");
};

const capitalizar = (texto) =>
  texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : "";

const MyBooking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "No se pudieron cargar tus reservas"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="mb-container">
      <div className="mb-header">
        <button className="mb-back" onClick={() => navigate("/")}>← Volver al inicio</button>
        <h1>Mis Reservas</h1>
        <p>Consulta el estado de tus reservas en tiempo real.</p>
      </div>

      {loading ? (
        <div className="mb-loading">Cargando reservas...</div>
      ) : bookings.length === 0 ? (
        <div className="mb-loading">Todavía no tenés reservas.</div>
      ) : (
        <div className="mb-list">
          {bookings.map((b) => (
            <div key={b._id} className="mb-card">
              <div className="mb-card-image">
                <img
                  src={
                    b.room?.images?.[0] ||
                    b.accommodation?.mainImage ||
                    "https://placehold.co/600x400?text=Hospedaje"
                  }
                  alt={b.room?.name || b.accommodation?.name || "Hospedaje"}
                />
              </div>
              <div className="mb-card-content">
                <div className="mb-card-header">
                  <h2>{b.accommodation?.name || "Hospedaje"}</h2>
                </div>
                <div className="mb-card-body">
                  <p><strong>Habitación:</strong> {b.room?.name || "-"}</p>
                  <p>
                    <strong>Fechas:</strong> {formatFecha(b.checkIn)} - {formatFecha(b.checkOut)}
                  </p>
                  {typeof b.totalPrice === "number" && (
                    <p><strong>Total:</strong> ${b.totalPrice.toLocaleString()}</p>
                  )}
                  <span className={`mb-status ${b.status}`}>
                    {capitalizar(b.status)}
                  </span>
                  {b.status === "pendiente" && (
                    <p className="mb-pending-note">
                      ⏳ Tu reserva está pendiente de confirmación del hospedaje.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
