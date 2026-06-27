import React, { useEffect, useState } from "react";
import "./MyBooking.css";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de API: reemplaza con tu endpoint real
    fetch("https://api.reservahost.com/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        // Datos de fallback si falla la API
        setBookings([
          { 
            id: 1, 
            lodging: "Hotel Central", 
            date: "12/07/2026", 
            status: "Confirmada", 
            image: "https://res.cloudinary.com/da8kxr6k5/image/upload/v1782588432/hotel_zs9zac.jpg" 
          },
          { 
            id: 2, 
            lodging: "Cabañas del Sol", 
            date: "20/07/2026", 
            status: "Pendiente", 
            image: "https://res.cloudinary.com/demo/image/upload/cabana.jpg" 
          },
          { 
            id: 3, 
            lodging: "Hostel Urbano", 
            date: "05/08/2026", 
            status: "Cancelada", 
            image: "https://res.cloudinary.com/demo/image/upload/hostel.jpg" 
          },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Mis Reservas</h1>
        <p>Consulta el estado de tus reservas en tiempo real.</p>
      </div>

      {loading ? (
        <div className="loading">Cargando reservas...</div>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="card-image">
                <img src={b.image} alt={b.lodging} />
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h2>{b.lodging}</h2>
                </div>
                <div className="card-body">
                  <p><strong>Fecha:</strong> {b.date}</p>
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
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
