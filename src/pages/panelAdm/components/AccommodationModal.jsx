import Modal from "./Modal";

export default function AccommodationModal({ accommodationForm, setAccommodationForm, saving, onClose, onSave }) {
  return (
    <Modal
      title="Editar hospedaje"
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} disabled={saving}>Cancelar</button>
          <button onClick={onSave} disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </>
      }
    >
      <div className="modal-field">
        <label>Nombre del hospedaje</label>
        <input name="name" placeholder="Ej. Hotel Paraíso" value={accommodationForm.name} onChange={(e) => setAccommodationForm({ ...accommodationForm, name: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>Descripción</label>
        <textarea name="description" placeholder="Describí el hospedaje" value={accommodationForm.description} onChange={(e) => setAccommodationForm({ ...accommodationForm, description: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>WhatsApp</label>
        <input name="whatsapp" placeholder="Ej. 5493815833048" value={accommodationForm.whatsapp} onChange={(e) => setAccommodationForm({ ...accommodationForm, whatsapp: e.target.value })} />
      </div>
      <div className="modal-field">
        <label>Porcentaje de seña</label>
        <input name="depositPercentage" type="number" placeholder="Ej. 30" value={accommodationForm.depositPercentage} onChange={(e) => setAccommodationForm({ ...accommodationForm, depositPercentage: e.target.value })} />
      </div>
      <label className="file-input-label">
        Imagen principal (opcional, reemplaza la actual)
        <input name="mainImage" type="file" accept="image/*" onChange={(e) => setAccommodationForm({ ...accommodationForm, mainImage: e.target.files[0] || null })} />
      </label>
      <label className="file-input-label">
        Galería (opcional, hasta 5)
        <input name="gallery" type="file" accept="image/*" multiple onChange={(e) => setAccommodationForm({ ...accommodationForm, gallery: Array.from(e.target.files) })} />
      </label>
    </Modal>
  );
}
