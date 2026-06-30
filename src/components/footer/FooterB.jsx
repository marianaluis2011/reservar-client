import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./FooterB.css";
import logo from '../../assets/hospedar.jpeg';
import { Link } from "react-router-dom";


export default function FooterB() {
  return (
    <footer className="footer-b">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section brand-section">
            <h2 className="footer-logo">
              <img src={logo} alt="Logo" className="footer-logo-img" />
              Hospedar
            </h2>
            <p className="footer-desc">
              Tu plataforma de confianza para encontrar el alojamiento perfecto. 
              Gestionamos las mejores propiedades para que tu única preocupación sea disfrutar de tu viaje.
            </p>
          </div>
          <div className="footer-section brand-section1">
            <div className="footer-section">
              <h4 className="section-title">Explorar</h4>
              <ul className="footer-links">
                <li><Link to="/404">Propiedades</Link></li>
                <li><Link to="/404">Destinos</Link></li>
                <li><Link to="/404">Promociones</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Información</h4>
              <ul className="footer-links">
                <li><Link to="/about">Sobre nosotros</Link></li>
                <li><Link to="/404">Términos y condiciones</Link></li>
                <li><Link to="/404">Política de privacidad</Link></li>
              </ul>
            </div>

            <div className="footer-section contact-section">
              <h4 className="section-title">Contacto</h4>
              <div className="contact-details">
                <div className="contact-item">
                  <FaMapMarkerAlt size={18} />
                  <span>Tucumán, Argentina</span>
                </div>
                <div className="contact-item">
                  <FaPhone size={18} />
                  <span>+54 381 123-4567</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope size={18} />
                  <a href="mailto:contacto@reservahost.com">contacto@reservahost.com</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Hospedar. Todos los derechos reservados.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
