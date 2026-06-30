import { useState, useEffect, useRef } from "react";
import {
  Wind,
  Wifi,
  Waves,
  Car,
  Coffee,
  Dumbbell,
  MapPin,
  ChevronLeft,
  Share,
  Heart,
  Phone,
  Mail,
  Link as LinkIcon
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccommodationById, getRoomsByAccommodation } from "../../services/accommodation.services.js";
import "./../propertyPage/PropertyPage.css";

export default function PropertyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareMenuRef = useRef(null);

  const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accData = await getAccommodationById(id);
        setProperty(accData);
        const roomsData = await getRoomsByAccommodation(id);
        setRooms(roomsData);
      } catch (error) {
        console.error("Error al cargar el hospedaje:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Cerrar menú de compartir al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareOptions]);

  if (loading) {
    return <div className="property-page-wrapper"><main className="main-content"><p>Cargando hospedaje...</p></main></div>;
  }

  if (!property) {
    return <div className="property-page-wrapper"><main className="main-content"><p>No se encontró el hospedaje.</p></main></div>;
  }

  return (
    <div className="property-page-wrapper">
      <main className="main-content">
        {/* Encabezado */}
        <div className="header-container">
          <div className="header-text-group">
            <button onClick={() => navigate(-1)} className="back-button">
              <ChevronLeft className="back-icon" />
              <span>Volver al listado</span>
            </button>
            <h1 className="page-title">{property.name}</h1>
            <div className="location-info">
              <MapPin className="location-icon-header" />
              <span>{property.province?.name || "Sin ubicación"}</span>
            </div>
          </div>

          <div className="action-buttons">
            <div className="share-container" ref={shareMenuRef}>
              <button
                className={`btn-secondary ${showShareOptions ? 'active' : ''}`}
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share className="share-icon" /> Compartir
              </button>

              {showShareOptions && (
                <div className="share-menu">
                  <button className="share-menu-item" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>
                    <svg className="social-icon fb" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor" /></svg>
                    Facebook
                  </button>
                  <button className="share-menu-item" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}>
                    <svg className="social-icon x-twitter" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" /></svg>
                    Twitter
                  </button>
                  <button className="share-menu-item" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(property.name + ' ' + window.location.href)}`, '_blank')}>
                    <svg className="social-icon whatsapp" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12.01 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 1.77.46 3.42 1.26 4.87L2.01 22.01l5.31-1.39c1.41.76 3.01 1.21 4.7 1.21 5.52 0 9.99-4.47 9.99-9.99 0-5.52-4.47-9.99-9.99-9.99zm0 18.27c-1.5 0-2.93-.39-4.19-1.08l-.3-.16-3.12.81.83-3.04-.18-.29a8.21 8.21 0 0 1-1.26-4.53c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.482-.404-.413-.55-.422H8.5c-.163 0-.426.061-.65.304-.223.243-.853.832-.853 2.03 0 1.198.873 2.355 1.056 2.518.183.163 1.716 2.62 4.12 3.64.58.25 1.02.4 1.38.52.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18s-.22-.16-.47-.28z" /></svg>
                    WhatsApp
                  </button>
                  <button className="share-menu-item" onClick={() => { navigator.clipboard.writeText(window.location.href); setShowShareOptions(false); alert("Enlace copiado!"); }}>
                    <LinkIcon className="social-icon link" size={18} />
                    Copiar Enlace
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Galería de Imágenes */}
        <div className="gallery-grid">
          <div className="image-container main-image-wrapper">
            <img src={property.mainImage} alt="Principal" className="gallery-image" />
          </div>
          <div className="gallery-sidebar">
            <div className="image-container gallery-item-small">
              <img src={property.gallery?.[0] || property.mainImage} alt="Interior" className="gallery-image" />
            </div>
            <div className="image-container gallery-item-small">
              <img src={property.gallery?.[1] || property.mainImage} alt="Vistas" className="gallery-image" />
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="content-layout">
          <div className="info-column">
            <section>
              <h2 className="section-title">Acerca de este alojamiento</h2>
              <p className="description-box">{property.description}</p>
            </section>

            <section>
              <h2 className="section-title section-title-divider">
                Servicios incluidos <div className="divider-line"></div>
              </h2>
              <div className="amenities-grid">
                <Amenity icon={<Waves />} label="Piscina" />
                <Amenity icon={<Car />} label="Estacionamiento" />
                <Amenity icon={<Wifi />} label="Wi-Fi Premium" />
                <Amenity icon={<Wind />} label="Aire Acondicionado" />
                <Amenity icon={<Coffee />} label="Desayuno Gourmet" />
                <Amenity icon={<Dumbbell />} label="Gimnasio 24 hs" />
              </div>
            </section>

            <section>
              <h2 className="section-title">Habitaciones disponibles</h2>
              <div className="rooms-list">
                {rooms.length === 0 ? (
                  <p>Este hospedaje todavía no tiene habitaciones cargadas.</p>
                ) : (
                  rooms.map((room) => (
                    <div key={room._id} className="room-card">
                      <div className="room-image-wrapper">
                        <img src={room.images?.[0] || property.mainImage} alt={room.name} className="room-card-image" />
                      </div>
                      <div className="room-info">
                        <h3 className="room-title">{room.name}</h3>
                        <p className="room-desc">{room.description}</p>
                        <div className="room-footer">
                          <span className="room-price">${room.pricePerNight?.toLocaleString()} <span className="room-price-detail">/noche</span></span>
                          <button className="btn-reserve" onClick={() => navigate(`/roomDetail/${room._id}`)}>Reservar</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <div className="sidebar-column">
            <section>
              <h2 className="section-title">Ubicación</h2>
              <div className="map-wrapper">
                <iframe
                  className="map-iframe"
                  title="Ubicación de la propiedad"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.province?.name || "Argentina")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
                <div className="map-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.province?.name || "Argentina")}`, '_blank')}>
                  <MapPin className="map-pin-icon" />
                  <span className="map-btn-text">Ver Mapa Completo</span>
                </div>
              </div>
            </section>

            <section className="contact-card">
              <h2 className="contact-title">Contacto Directo</h2>
              {/* <p className="contact-text">¿Tienes dudas sobre el alojamiento? Habla directo con nosotros.</p> */}

              <div className="contact-methods">
                <div className="contact-item">
                  <div className="contact-icon-bg">
                    <Phone className="contact-icon-white" />
                  </div>
                  <span>{property.whatsapp}</span>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-bg">
                    <Mail className="contact-icon-white" />
                  </div>
                  <a href={`mailto:${property.contactEmail}`}>
                    {property.contactEmail}
                  </a>

                </div>
              </div>

              <div className="contact-divider"></div>

              {property.whatsapp && (
              <a href={`https://wa.me/${property.whatsapp}`} className="btn-whatsapp">
                <svg className="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M12.01 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 1.77.46 3.42 1.26 4.87L2.01 22.01l5.31-1.39c1.41.76 3.01 1.21 4.7 1.21 5.52 0 9.99-4.47 9.99-9.99 0-5.52-4.47-9.99-9.99-9.99zm0 18.27c-1.5 0-2.93-.39-4.19-1.08l-.3-.16-3.12.81.83-3.04-.18-.29a8.21 8.21 0 0 1-1.26-4.53c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.243-.284.365-.426.122-.141.163-.243.243-.406.08-.163.04-.304-.02-.426s-.56-1.34-.76-1.84c-.2-.482-.404-.413-.55-.422H8.5c-.163 0-.426.061-.65.304-.223.243-.853.832-.853 2.03 0 1.198.873 2.355 1.056 2.518.183.163 1.716 2.62 4.12 3.64.58.25 1.02.4 1.38.52.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18s-.22-.16-.47-.28z" />
                </svg>
                Contactar por WhatsApp
              </a>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Amenity({ icon, label }) {
  return (
    <div className="amenity-card">
      <div className="amenity-icon-wrapper">{icon}</div>
      <span className="amenity-label">{label}</span>
    </div>
  );
}