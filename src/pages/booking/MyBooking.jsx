import React, { useEffect, useState } from "react";
import { getMyBookings } from "../../services/booking.services.js";
import { toast } from "sonner";
import "./MyBooking.css";

// La fecha llega como ISO ("YYYY-MM-DD..."). Tomamos solo el día calendario
// para no correr un día por diferencia de huso horario.
const formatFecha = (iso) => {
  if (!iso) return "-";
  return iso.slice(0, 10).split("-").reverse().join("/");
};

const capitalizar = (texto) =>
  texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : "";

const MyBooking = () => {
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
    <div className="booking-container">
      <div className="booking-header">
        <h1>Mis Reservas</h1>
        <p>Consulta el estado de tus reservas en tiempo real.</p>
      </div>

      {loading ? (
        <div className="loading">Cargando reservas...</div>
      ) : bookings.length === 0 ? (
        <div className="loading">Todavía no tenés reservas.</div>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <div className="card-image">
                <img
                  src={
                    b.accommodation?.mainImage ||
                    "https://placehold.co/600x400?text=Hospedaje"
                  }
                  alt={b.accommodation?.name || "Hospedaje"}
                />
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h2>{b.accommodation?.name || "Hospedaje"}</h2>
                </div>
                <div className="card-body">
                  <p><strong>Habitación:</strong> {b.room?.name || "-"}</p>
                  <p>
                    <strong>Fechas:</strong> {formatFecha(b.checkIn)} - {formatFecha(b.checkOut)}
                  </p>
                  {typeof b.totalPrice === "number" && (
                    <p><strong>Total:</strong> ${b.totalPrice.toLocaleString()}</p>
                  )}
                  <span className={`status ${b.status}`}>
                    {capitalizar(b.status)}
                  </span>
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
