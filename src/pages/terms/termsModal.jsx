import "./termsModal.css";

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Términos y Servicios</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
            <p>
                Al crear una cuenta aceptas utilizar la plataforma de forma
                responsable y conforme a la legislación vigente.
                </p>

                <h3>2. Registro de Usuario</h3>

                <p>
                La información proporcionada deberá ser verdadera, completa y
                mantenerse actualizada. Cada usuario es responsable de la seguridad
                de sus credenciales.
                </p>

                <h3>3. Publicación de Hospedajes</h3>

                <p>
                Los propietarios garantizan que la información publicada sobre sus
                hospedajes es veraz. La plataforma podrá suspender publicaciones que
                incumplan estas condiciones.
                </p>

                <h3>4. Reservas</h3>

                <p>
                Las reservas realizadas a través de la plataforma constituyen una
                solicitud entre huésped y propietario. Cada parte será responsable
                del cumplimiento de los acuerdos establecidos.
                </p>

                <h3>5. Privacidad</h3>

                <p>
                Tus datos personales serán tratados únicamente para la prestación del
                servicio y conforme a la normativa aplicable de protección de datos.
                </p>

                <h3>6. Responsabilidad</h3>

                <p>
                La plataforma actúa como intermediaria entre huéspedes y propietarios
                y no garantiza la disponibilidad permanente de los servicios ni será
                responsable por acuerdos incumplidos entre las partes.
                </p>

                <h3>7. Modificaciones</h3>

                <p>
                Estos términos podrán actualizarse periódicamente. El uso continuado
                de la plataforma implica la aceptación de dichas modificaciones.
            </p>
        </div>
        <div className="modal-footer">
          <button className="btn-lodging" onClick={onAccept}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
