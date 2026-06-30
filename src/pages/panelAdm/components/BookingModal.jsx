import Modal from "./Modal";

export default function BookingModal({ bookingForm, setBookingForm, rooms, saving, onClose, onSave }) {
  return (
    <Modal
      title="Nueva reserva"
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} disabled={saving}>Cancelar</button>
          <button onClick={onSave} disabled={saving}>
            {saving ? "Creando..." : "Crear reserva"}
          </button>
        </>
      }
    >
      <div className="modal-field">
        <label>Nombre del huésped <span className="modal-optional">(opcional)</span></label>
        <input name="guestName" type="text" placeholder="Ej. Juan Pérez" value={bookingForm.guestName} onChange={(e) => setBookingForm({ ...bookingForm, guestName: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>Email del huésped</label>
        <input name="guestEmail" type="email" placeholder="huesped@ejemplo.com" value={bookingForm.guestEmail} onChange={(e) => setBookingForm({ ...bookingForm, guestEmail: e.target.value })} />
        <small className="booking-hint">No hace falta que el huésped tenga cuenta. Le llegará un email con los datos de la reserva.</small>
      </div>
      <div className="modal-field">
        <label>Habitación</label>
        <select name="room" value={bookingForm.room} onChange={(e) => setBookingForm({ ...bookingForm, room: e.target.value })}>
          <option value="">Seleccionar habitación</option>
          {rooms.map((r) => <option key={r._id} value={r._id}>{r.name} - ${r.pricePerNight}</option>)}
        </select>
      </div>
      <div className="modal-field">
        <label>Check-in</label>
        <input name="checkIn" type="date" value={bookingForm.checkIn} onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>Check-out</label>
        <input name="checkOut" type="date" value={bookingForm.checkOut} onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })} />
      </div>
    </Modal>
  );
}
