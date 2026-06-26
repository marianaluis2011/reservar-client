import "./MyBooking.css";

const MyBooking = () => {
  const bookings = [
    {
      id: 1,
      lodging: "Hotel Central",
      date: "12/07/2026",
      status: "Confirmada",
    },
    {
      id: 2,
      lodging: "Cabañas del Sol",
      date: "20/07/2026",
      status: "Pendiente",
    },
    {
      id: 3,
      lodging: "Hostel Urbano",
      date: "05/08/2026",
      status: "Cancelada",
    },
  ];

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Mis Reservas</h1>
        <p>Aquí puedes ver el estado de tus reservas realizadas.</p>
      </div>

      <div className="booking-list">
        {bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <h2>{b.lodging}</h2>
            <p><strong>Fecha:</strong> {b.date}</p>
            <span className={`status ${b.status.toLowerCase()}`}>
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
