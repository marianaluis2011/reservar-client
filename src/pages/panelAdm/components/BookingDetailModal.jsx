import Modal from "./Modal";
import { formatPrice, formatBookingDates, formatBookingStatus } from "../helpers";

export default function BookingDetailModal({ booking, onClose }) {
  return (
    <Modal
      title="Detalle de reserva"
      onClose={onClose}
      footer={<button onClick={onClose}>Cerrar</button>}
    >
      <div className="booking-detail-list">
        {[
          ["Cliente", booking.user?.fullName || booking.guestName || "Cliente"],
          ["Email", booking.user?.email || booking.guestEmail || "Sin email"],
          ["Habitación", booking.room?.name || "Habitación"],
          ["Fechas", formatBookingDates(booking.checkIn, booking.checkOut)],
          ["Estado", formatBookingStatus(booking.status)],
          ["Total", `$${formatPrice(booking.totalPrice)}`],
        ].map(([label, value]) => (
          <p key={label}><strong>{label}:</strong> {value}</p>
        ))}
      </div>
    </Modal>
  );
}
