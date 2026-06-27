import React from "react";
import "./Help.css";

const Help = () => {
  return (
    <div className="help-container">
      <header className="help-header">
        <h1>Centro de Ayuda</h1>
        <p>Encuentra respuestas y soporte para tu experiencia en ReservaHost.</p>
      </header>

      <section className="help-section">
        <h2>Guías rápidas</h2>
        <div className="help-cards">
          <div className="help-card">
            <h3>Cómo reservar hospedajes</h3>
            <p>Aprende a buscar y confirmar tu estancia en pocos pasos.</p>
          </div>
          <div className="help-card">
            <h3>Cómo publicar tu hospedaje</h3>
            <p>Descubre cómo administrar tus habitaciones y recibir reservas.</p>
          </div>
          <div className="help-card">
            <h3>Gestión de tu cuenta</h3>
            <p>Configura tu perfil, contraseña y preferencias de usuario.</p>
          </div>
          <div className="help-card">
            <h3>Pagos y facturación</h3>
            <p>Información sobre métodos de pago, seguridad y comprobantes.</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-item">
          <h3>¿Cómo puedo crear una cuenta?</h3>
          <p>Haz clic en “Crear cuenta” en la página principal, completa tus datos y acepta los términos de servicio.</p>
        </div>
        <div className="faq-item">
          <h3>¿Es seguro pagar a través de la plataforma?</h3>
          <p>Sí, utilizamos pasarelas de pago certificadas con encriptación avanzada para proteger tus transacciones.</p>
        </div>
        <div className="faq-item">
          <h3>¿Puedo cancelar una reserva?</h3>
          <p>Depende de la política del hospedaje. En tu perfil encontrarás la opción de cancelar si el alojamiento lo permite.</p>
        </div>
        <div className="faq-item">
          <h3>¿Cómo contacto al soporte técnico?</h3>
          <p>Desde la sección “Contacto” podrás enviar un mensaje directo a nuestro equipo de soporte.</p>
        </div>
        <div className="faq-item">
          <h3>¿Qué pasa si olvidé mi contraseña?</h3>
          <p>En la página de login selecciona “Olvidé mi contraseña” y sigue las instrucciones para restablecerla.</p>
        </div>
        <div className="faq-item">
          <h3>¿Puedo modificar los datos de mi hospedaje?</h3>
          <p>Sí, desde tu panel de administración puedes editar la información, fotos y precios de tus habitaciones.</p>
        </div>
      </section>
    </div>
  );
};

export default Help;
