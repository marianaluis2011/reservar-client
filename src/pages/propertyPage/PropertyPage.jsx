import { 
  Bed, 
  Wind, 
  Wifi, 
  ShowerHead, 
  MapPin, 
  MessageCircle, 
  ChevronLeft,
  Share,
  Heart
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
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=800",
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800",
    ],
    rooms: [
      { id: 1, name: "Suite Matrimonial Premium", description: "Cama King Size, aire acondicionado, balcón privado y jacuzzi.", price: 35000 },
      { id: 2, name: "Habitación Doble Superior", description: "Dos camas individuales, escritorio de trabajo y vista a la ciudad.", price: 28000 }
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
                <Amenity icon={<Bed />} label="Cama King Size" />
                <Amenity icon={<Wind />} label="Aire acondicionado" />
                <Amenity icon={<Wifi />} label="Wi-Fi Premium" />
                <Amenity icon={<ShowerHead />} label="Baño privado" />
              </div>
            </section>

            <section>
              <h2 className="section-title">Habitaciones disponibles</h2>
              <div className="rooms-grid">
                {property.rooms.map((room) => (
                  <div key={room.id} className="room-card">
                    <h3 className="room-title">{room.name}</h3>
                    <p className="room-desc">{room.description}</p>
                    <div className="room-footer">
                      <span className="room-price">${room.price.toLocaleString()}</span>
                      <button className="btn-reserve">Reservar</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="sidebar-column">
            <section>
              <h2 className="section-title">Ubicación en Google</h2>
              <div className="map-wrapper">
                <div className="map-placeholder" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800')" }}></div>
                <div className="map-btn">
                  <MapPin className="map-pin-icon" />
                  <span className="map-btn-text">Ver Mapa Completo</span>
                </div>
              </div>
            </section>

            <section className="contact-card">
              <h2 className="contact-title">Contacto</h2>
              <p className="contact-text">¿Tienes dudas sobre el alojamiento? Habla directo con nosotros.</p>
              <a href={`https://wa.me/${property.whatsapp}`} className="btn-whatsapp">
                <MessageCircle className="whatsapp-icon" /> Contactar por WhatsApp
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