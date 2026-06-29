import Modal from "./Modal";

export default function RoomModal({ editingRoom, roomForm, setRoomForm, saving, onClose, onSave }) {
  return (
    <Modal
      title={editingRoom ? "Editar habitación" : "Nueva habitación"}
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} disabled={saving}>Cancelar</button>
          <button onClick={onSave} disabled={saving}>
            {saving ? "Guardando..." : editingRoom ? "Guardar cambios" : "Crear habitación"}
          </button>
        </>
      }
    >
      <div className="modal-field">
        <label>Nombre de la habitación</label>
        <input name="name" placeholder="Ej. Suite doble" value={roomForm.name} onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>Descripción</label>
        <textarea name="description" placeholder="Describí la habitación" value={roomForm.description} onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>Capacidad máxima</label>
        <input name="maxCapacity" type="number" placeholder="Ej. 2" value={roomForm.maxCapacity} onChange={(e) => setRoomForm({ ...roomForm, maxCapacity: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>Precio por noche</label>
        <input name="pricePerNight" type="number" placeholder="Ej. 15000" value={roomForm.pricePerNight} onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: e.target.value })} />
      </div>
      <label className="file-input-label">
        Imágenes {editingRoom ? "(opcional, reemplazan las actuales)" : "(opcional, hasta 5)"}
        <input name="imagenes" type="file" accept="image/*" multiple onChange={(e) => setRoomForm({ ...roomForm, images: Array.from(e.target.files) })} />
      </label>
    </Modal>
  );
}
