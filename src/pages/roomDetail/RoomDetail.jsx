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
  MapPin,
  Calendar,
  Users,
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
                <Share className="share-icon" /> Compartir
              </button>
              
              {showShareOptions && (
                <div className="share-menu">
                  <button className="share-menu-item" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>
                    <svg className="social-icon fb" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/></svg>
                    Facebook
                  </button>
                  <button className="share-menu-item" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}>
                    <svg className="social-icon x-twitter" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/></svg>
                    Twitter
                  </button>
                  <button className="share-menu-item" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(ROOM_DATA.name + ' ' + window.location.href)}`, '_blank')}>
                    <svg className="social-icon whatsapp" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12.01 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 1.77.46 3.42 1.26 4.87L2.01 22.01l5.31-1.39c1.41.76 3.01 1.21 4.7 1.21 5.52 0 9.99-4.47 9.99-9.99 0-5.52-4.47-9.99-9.99-9.99zm0 18.27c-1.5 0-2.93-.39-4.19-1.08l-.3-.16-3.12.81.83-3.04-.18-.29a8.21 8.21 0 0 1-1.26-4.53c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.482-.404-.413-.55-.422H8.5c-.163 0-.426.061-.65.304-.223.243-.853.832-.853 2.03 0 1.198.873 2.355 1.056 2.518.183.163 1.716 2.62 4.12 3.64.58.25 1.02.4 1.38.52.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18s-.22-.16-.47-.28z"/></svg>
                    WhatsApp
                  </button>
                  <button className="share-menu-item" onClick={() => { navigator.clipboard.writeText(window.location.href); setShowShareOptions(false); alert("Enlace copiado!"); }}>
                    <LinkIcon className="social-icon link" size={18} /> 
                    Copiar Enlace
                  </button>
                </div>
              )}
            </div>

            <button 
              className={`btn-icon ${isSaved ? 'is-saved' : ''}`} 
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart className={`heart-icon ${isSaved ? 'filled' : ''}`} /> 
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
              <div 
                key={i} 
                className={`thumb-container ${i === currentImgIndex ? "selected" : ""}`} 
                onClick={() => setCurrentImgIndex(i)}
              >
                <img 
                  src={img} 
                  className="thumb-image" 
                  alt={`${ROOM_DATA.name} miniatura ${i + 1}`}
                />
              </div>
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
                    <span>${ROOM_DATA.pricePerNight.toLocaleString()} x {nights} noche/s</span>
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
              <X size={20} />
            </button>

            <div className="modal-header-img">
              <img src={ROOM_DATA.images[0]} alt={ROOM_DATA.name} />
            </div>

            <div className="modal-body">
              <h2 className="modal-title">Detalles de la Reserva</h2>
              
              <div className="modal-info-section">
                <h3 className="room-name-modal">{ROOM_DATA.name}</h3>
                <div className="info-item-modal">
                  <MapPin size={16} />
                  <span>San Miguel de Tucumán, Tucumán</span>
                </div>
                <div className="info-item-modal">
                  <Calendar size={16} />
                  <span>{checkIn.split("-").reverse().join("/")} - {checkOut.split("-").reverse().join("/")}</span>
                </div>
                <div className="info-item-modal">
                  <Users size={16} />
                  <span>2 adultos</span>
                </div>
              </div>

              <div className="modal-divider"></div>

              <div className="price-breakdown-modal">
                <div className="price-row-modal">
                  <span>Tarifa por {nights} {nights === 1 ? 'noche' : 'noches'}</span>
                  <span>${(ROOM_DATA.pricePerNight * nights).toLocaleString()}</span>
                </div>
                <div className="price-row-modal">
                  <span>Impuesto por servicios (10%)</span>
                  <span>${(totalPrice * 0.1).toLocaleString()}</span>
                </div>
                <div className="price-row-modal total-row-modal">
                  <span>Total</span>
                  <span>${(totalPrice * 1.1).toLocaleString()}</span>
                </div>
              </div>

              <div className="modal-actions-container">
                <button className="btn-mercado-pago" onClick={() => alert("Redirigiendo a Mercado Pago...")}>
                  Pagar
                </button>
                <button className="btn-whatsapp-modal" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent("Hola, quiero confirmar mi reserva para " + ROOM_DATA.name + " desde el " + checkIn.split("-").reverse().join("/") + " hasta el " + checkOut.split("-").reverse().join("/"))}`, '_blank')}>
                  <svg className="whatsapp-icon-modal" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M12.01 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 1.77.46 3.42 1.26 4.87L2.01 22.01l5.31-1.39c1.41.76 3.01 1.21 4.7 1.21 5.52 0 9.99-4.47 9.99-9.99 0-5.52-4.47-9.99-9.99-9.99zm0 18.27c-1.5 0-2.93-.39-4.19-1.08l-.3-.16-3.12.81.83-3.04-.18-.29a8.21 8.21 0 0 1-1.26-4.53c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.482-.404-.413-.55-.422H8.5c-.163 0-.426.061-.65.304-.223.243-.853.832-.853 2.03 0 1.198.873 2.355 1.056 2.518.183.163 1.716 2.62 4.12 3.64.58.25 1.02.4 1.38.52.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18s-.22-.16-.47-.28z"/>
                  </svg>
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}