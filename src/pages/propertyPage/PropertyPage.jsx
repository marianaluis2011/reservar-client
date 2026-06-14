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
  Mail
} from "lucide-react";
import { useNavigate } from "react-router";
import "./../propertyPage/PropertyPage.css";

export default function PropertyPage() {
  const navigate = useNavigate();

  // Datos de ejemplo basados en tu estructura
  const property = {
    name: "Residencial del Valle Boutique",
    location: "San Miguel de Tucumán, Tucumán",
    price: 45000,
    description: "Este exclusivo residencial boutique ofrece una experiencia única de confort y tranquilidad. Situado en una zona privilegiada de la ciudad de San Miguel de Tucumán, cada detalle ha sido cuidadosamente pensado para brindar calidez, elegancia y un servicio personalizado a nuestros huéspedes.",
    whatsapp: "5493812345678",
    phone: "+54 9 381 123-4567",
    email: "contacto@residencialdelvalle.com",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=800",
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800",
    ],
    rooms: [
      { 
        id: 1, 
        name: "Suite Matrimonial Premium", 
        description: "Cama King Size, aire acondicionado, balcón privado y jacuzzi.", 
        price: 35000,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800"
      },
      { 
        id: 2, 
        name: "Habitación Doble Superior", 
        description: "Dos camas individuales, escritorio de trabajo y vista a la ciudad.", 
        price: 28000,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800"
      }
    ]
  };

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
              <span>{property.location}</span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn-secondary">
              <Share className="share-icon" /> Compartir
            </button>
            <button className="btn-icon">
              <Heart className="heart-icon" />
            </button>
          </div>
        </div>

        {/* Galería de Imágenes */}
        <div className="gallery-grid">
          <div className="image-container main-image-wrapper">
            <img src={property.images[0]} alt="Principal" className="gallery-image" />
          </div>
          <div className="gallery-sidebar">
            <div className="image-container gallery-item-small">
              <img src={property.images[1]} alt="Interior" className="gallery-image" />
            </div>
            <div className="image-container gallery-item-small">
              <img src={property.images[2]} alt="Vistas" className="gallery-image" />
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
                <Amenity icon={<Waves />} label="Piscina Climatizada" />
                <Amenity icon={<Car />} label="Estacionamiento Privado" />
                <Amenity icon={<Wifi />} label="Wi-Fi de Alta Velocidad" />
                <Amenity icon={<Wind />} label="Aire Acondicionado" />
                <Amenity icon={<Coffee />} label="Desayuno Gourmet" />
                <Amenity icon={<Dumbbell />} label="Gimnasio 24 hs" />
              </div>
            </section>

            <section>
              <h2 className="section-title">Habitaciones disponibles</h2>
              <div className="rooms-list">
                {property.rooms.map((room) => (
                  <div key={room.id} className="room-card">
                    <div className="room-image-wrapper">
                      <img src={room.image} alt={room.name} className="room-card-image" />
                    </div>
                    <div className="room-info">
                      <h3 className="room-title">{room.name}</h3>
                      <p className="room-desc">{room.description}</p>
                      <div className="room-footer">
                        <span className="room-price">${room.price.toLocaleString()} <span className="room-price-detail">/noche</span></span>
                        <button className="btn-reserve">Reservar</button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
                <div className="map-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`, '_blank')}>
                  <MapPin className="map-pin-icon" />
                  <span className="map-btn-text">Ver Mapa Completo</span>
                </div>
              </div>
            </section>

            <section className="contact-card">
              <h2 className="contact-title">Contacto</h2>
              <p className="contact-text">¿Tienes dudas sobre el alojamiento? Habla directo con nosotros.</p>
              
              <div className="contact-methods">
                <div className="contact-item">
                  <div className="contact-icon-bg">
                    <Phone className="contact-icon-white" />
                  </div>
                  <span>{property.phone}</span>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-bg">
                    <Mail className="contact-icon-white" />
                  </div>
                  <span>{property.email}</span>
                </div>
              </div>

              <div className="contact-divider"></div>

              <a href={`https://wa.me/${property.whatsapp}`} className="btn-whatsapp">
                <svg className="whatsapp-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.3 106.2 27.3 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.3zM223.9 445.2c-33.1 0-65.5-8.9-95.7-25.7l-6.9-3.9-71.3 18.7 18.8-69.5-4.2-6.7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 188.2-184.5 50.3 0 97.5 19.6 133 55.1s55.1 82.7 55.1 133c0 101.7-82.8 184.5-188.2 184.5zm103.6-141.3c-5.7-2.8-33.5-16.5-38.7-18.4-5.2-1.9-9-2.8-12.8 2.8-3.8 5.7-14.7 18.4-18 20.4-3.3 1.9-6.6 2.2-12.3-.7-5.7-2.8-24-8.8-45.6-28.1-16.8-15-28.1-33.6-31.4-39.3-3.3-5.7-.4-8.8 2.5-11.6 2.6-2.5 5.7-6.6 8.5-9.9 2.8-3.3 3.8-5.7 5.7-9.4 1.9-3.8 1-7.1-.5-9.9-1.4-2.8-12.8-30.8-17.5-41.7-4.6-10.7-9.3-9.3-12.8-9.4-3.3-.1-7.1-.1-10.9-.1-3.8 0-10 1.4-15.2 7.1-5.2 5.7-19.9 19.4-19.9 47.3 0 27.9 20.4 54.8 23.2 58.6 2.8 3.3 40.1 61.2 97.1 85.8 13.5 25.7 27.1 27.2 36.6 27.2 9.5 0 30.8-12.6 35.1-24.7 4.3-12.1 4.3-22.5 3-24.7s-4.8-3.3-10.5-6.1z"/>
                </svg>
                Contactar por WhatsApp
              </a>
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