import { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Wifi, 
  Wind, 
  Tv, 
  Coffee, 
  ShieldCheck, 
  Star,
  Heart,
  Share,
  X,
  Link as LinkIcon
} from "lucide-react";
import { useNavigate } from "react-router";
import "./RoomDetail.css";

// 1. Definimos la data fuera del componente para evitar errores de referencia y re-renders innecesarios
const ROOM_DATA = {
  name: "Suite Matrimonial Premium",
  description: "Disfruta de la máxima comodidad en nuestra suite de lujo. Diseñada con un estilo contemporáneo y toques boutique, ofrece una vista inigualable y servicios de primera clase para una estancia inolvidable.",
  pricePerNight: 35000,
  images: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200",
    "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
  ],
  amenities: [
    { icon: <Wifi size={20} />, label: "Wi-Fi de alta velocidad" },
    { icon: <Wind size={20} />, label: "Aire Acondicionado" },
    { icon: <Tv size={20} />, label: "Smart TV 55'" },
    { icon: <Coffee size={20} />, label: "Cafetera Nespresso" },
    { icon: <ShieldCheck size={20} />, label: "Caja de seguridad" },
  ]
};

export default function RoomDetail() {
  const navigate = useNavigate();
  
  // Definimos "today" de forma que sea inmutable para comparaciones
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1));
  const shareMenuRef = useRef(null);

  // Valores derivados: se calculan en cada render basándose en el estado de checkIn/checkOut
  const nights = (checkIn && checkOut) ? Math.max(0, Math.round((new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) / 86400000)) : 0;
  const totalPrice = nights * ROOM_DATA.pricePerNight;

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

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === ROOM_DATA.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? ROOM_DATA.images.length - 1 : prev - 1));
  };

  // Lógica del Calendario
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const daysOfWeek = ["D", "L", "M", "X", "J", "V", "S"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const formatDate = (year, month, day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const handleDateClick = (day) => {
    const dateStr = formatDate(viewDate.getFullYear(), viewDate.getMonth(), day);
    const clickedDate = new Date(dateStr + "T00:00:00").getTime();
    const checkInDate = checkIn ? new Date(checkIn + "T00:00:00").getTime() : null;

    // Evitar seleccionar fechas pasadas
    if (clickedDate < today.getTime()) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut("");
    } else {
      if (checkInDate && clickedDate < checkInDate) {
        setCheckIn(dateStr);
        setCheckOut("");
      } else if (dateStr !== checkIn) {
        setCheckOut(dateStr);
      }
    }
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  return (
    <div className="room-detail-wrapper">
      <main className="room-container">
        {/* Encabezado con botones de acción (Estilo PropertyPage) */}
        <div className="room-header">
          <button onClick={() => navigate(-1)} className="back-link">
            <ChevronLeft size={20} /> Volver a la propiedad
          </button>
          
          <div className="action-buttons">
            <div className="share-container" ref={shareMenuRef}>
              <button 
                className={`btn-secondary ${showShareOptions ? 'active' : ''}`}
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share size={16} /> Compartir
              </button>
              
              {showShareOptions && (
                <div className="share-menu">
                  <button className="share-menu-item" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(ROOM_DATA.name + ' ' + window.location.href)}`, '_blank')}>
                    WhatsApp
                  </button>
                  <button className="share-menu-item" onClick={() => { navigator.clipboard.writeText(window.location.href); setShowShareOptions(false); alert("Enlace copiado!"); }}>
                    <LinkIcon size={16} /> Copiar Enlace
                  </button>
                </div>
              )}
            </div>

            <button 
              className={`btn-icon ${isSaved ? 'is-saved' : ''}`} 
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart className={`heart-icon ${isSaved ? 'filled' : ''}`} size={18} /> 
              {isSaved ? 'Guardado' : 'Guardar'}
            </button>
          </div>
        </div>

        {/* Galería Estilo Imagen Solicitada */}
        <div className="room-gallery">
          <div className="carousel-main">
            <button className="carousel-control prev" onClick={prevImage}>
              <ChevronLeft size={30} color="white" />
            </button>
            <img src={ROOM_DATA.images[currentImgIndex]} alt={ROOM_DATA.name} className="main-slide" />
            <button className="carousel-control next" onClick={nextImage}>
              <ChevronRight size={30} color="white" />
            </button>
            <div className="carousel-dots">
              {ROOM_DATA.images.map((_, i) => (
                <span key={i} className={`dot ${i === currentImgIndex ? "active" : ""}`} />
              ))}
            </div>
          </div>
          <div className="gallery-thumbs">
            {ROOM_DATA.images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                className={`thumb ${i === currentImgIndex ? "selected" : ""}`} 
                onClick={() => setCurrentImgIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="room-grid">
          <div className="room-info-section">
            <h1 className="room-name">{ROOM_DATA.name}</h1>
            <div className="room-rating">
              <Star className="star-icon" size={16} fill="#FFD700" color="#FFD700" />
              <span>4.9 (12 reseñas)</span>
            </div>
            <p className="room-description">{ROOM_DATA.description}</p>

            <div className="amenities-container">
              <h3 className="subtitle">¿Qué ofrece esta habitación?</h3>
              <div className="amenities-list">
                {ROOM_DATA.amenities.map((item, index) => (
                  <div key={index} className="amenity-item">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="booking-sidebar">
            {/* Calendario de Disponibilidad movido arriba de la booking-card */}
            <section className="availability-section">
              <div className="calendar-mock">
                <div className="calendar-header">
                  <button onClick={handlePrevMonth} className="calendar-nav-btn"><ChevronLeft size={18} /></button>
                  <h4>{months[viewDate.getMonth()]} {viewDate.getFullYear()}</h4>
                  <button onClick={handleNextMonth} className="calendar-nav-btn"><ChevronRight size={18} /></button>
                </div>
                <div className="calendar-grid">
                  {daysOfWeek.map(d => <div key={d} className="calendar-weekday">{d}</div>)}
                  {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty" />
                  ))}
                  {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = formatDate(viewDate.getFullYear(), viewDate.getMonth(), day);
                    const currentDate = new Date(dateStr + "T00:00:00").getTime();
                    
                    const isCheckIn = checkIn === dateStr;
                    const isCheckOut = checkOut === dateStr;
                    const isBetween = checkIn && checkOut && 
                                     currentDate > new Date(`${checkIn}T00:00:00`).getTime() && 
                                     currentDate < new Date(`${checkOut}T00:00:00`).getTime();
                    const isPast = currentDate < today.getTime();

                    return (
                      <div 
                        key={day} 
                        className={`calendar-day ${isPast ? 'is-past' : ''} ${isCheckIn || isCheckOut ? 'active-date' : ''} ${isBetween ? 'selected-range' : ''}`}
                        onClick={() => !isPast && handleDateClick(day)}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <div className="booking-card">
              <div className="booking-header">
                <span className="price-big">${ROOM_DATA.pricePerNight.toLocaleString()}</span>
                <span className="price-label">/ noche</span>
              </div>

              <div className="booking-form">
                <div className="date-inputs">
                  <div className="input-group">
                    <label>Check-in</label>
                    <input type="date" value={checkIn} min={formatDate(today.getFullYear(), today.getMonth(), today.getDate())} onChange={(e) => setCheckIn(e.target.value)} />
                  </div>
                  <div className="input-group">
                    <label>Check-out</label>
                    <input type="date" value={checkOut} min={checkIn || formatDate(today.getFullYear(), today.getMonth(), today.getDate())} onChange={(e) => setCheckOut(e.target.value)} />
                  </div>
                </div>
                <div className="input-group guest-input">
                  <label>Huéspedes</label>
                  <select>
                    <option>1 adulto</option>
                    <option>2 adultos</option>
                  </select>
                </div>
              </div>

              {nights > 0 && (
                <div className="price-summary">
                  <div className="summary-row">
                    <span>${ROOM_DATA.pricePerNight.toLocaleString()} x {nights} noches</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button 
                className="btn-reserve-now" 
                disabled={!checkIn || !checkOut}
                onClick={() => setShowModal(true)}
              >
                Reservar ahora
              </button>
              <p className="no-charge-text">No se te cobrará nada aún</p>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setShowModal(false)} aria-label="Cerrar">
              <X size={24} />
            </button>
            <h2 className="modal-title">Confirmar Reserva</h2>
            <div className="modal-details">
              <p><strong>Habitación:</strong> {ROOM_DATA.name}</p>
              <p><strong>Check-in:</strong> {checkIn}</p>
              <p><strong>Check-out:</strong> {checkOut}</p>
              <p><strong>Estancia:</strong> {nights} noches</p>
              <div className="modal-divider"></div>
              <p className="modal-total">Total a pagar: <span>${totalPrice.toLocaleString()}</span></p>
            </div>
            <div className="modal-actions">
              <button className="btn-pay" onClick={() => alert("Módulo de pago próximamente...")}>Pagar</button>
              <button className="btn-confirm" onClick={() => {
                alert("¡Reserva confirmada!");
                setShowModal(false);
              }}>Confirmar reserva</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}