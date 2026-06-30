import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Help.css";

const faqs = [
  { question: "¿Cómo puedo crear una cuenta?", answer: "Haz clic en “Crear cuenta” en la página principal, completa tus datos y acepta los términos de servicio." },
  { question: "¿Es seguro pagar a través de la plataforma?", answer: "Sí, utilizamos pasarelas de pago certificadas con encriptación avanzada para proteger tus transacciones." },
  { question: "¿Puedo cancelar una reserva?", answer: "Depende de la política del hospedaje. En tu perfil encontrarás la opción de cancelar si el alojamiento lo permite." },
  { question: "¿Cómo contacto al soporte técnico?", answer: "Desde la sección “Contacto” podrás enviar un mensaje directo a nuestro equipo de soporte." },
  { question: "¿Qué pasa si olvidé mi contraseña?", answer: "En la página de login selecciona “Olvidé mi contraseña” y sigue las instrucciones para restablecerla." },
  { question: "¿Puedo modificar los datos de mi hospedaje?", answer: "Sí, desde tu panel de administración puedes editar la información, fotos y precios de tus habitaciones." }
];

const Help = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="help-container">
      <header className="help-header">
        <div className="help-gradient">
          <button className="help-back" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Volver
          </button>
          <h1 className="help-title">Centro de Ayuda</h1>
          <p className="help-subtitle">Encuentra respuestas y soporte para tu experiencia en ReservaHost.</p>
          <span className="line"></span>
        </div>
      </header>

      <section className="help-section">
        <h2>Guías rápidas</h2>
        <div className="help-cards">
          <div className="help-card"><h3>Cómo reservar hospedajes</h3><p>Aprende a buscar y confirmar tu estancia en pocos pasos.</p></div>
          <div className="help-card"><h3>Cómo publicar tu hospedaje</h3><p>Descubre cómo administrar tus habitaciones y recibir reservas.</p></div>
          <div className="help-card"><h3>Gestión de tu cuenta</h3><p>Configura tu perfil, contraseña y preferencias de usuario.</p></div>
          <div className="help-card"><h3>Pagos y facturación</h3><p>Información sobre métodos de pago, seguridad y comprobantes.</p></div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-title">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>
            <div className="faq-answer" style={{ maxHeight: activeIndex === index ? "200px" : "0", opacity: activeIndex === index ? "1" : "0" }}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Help;
