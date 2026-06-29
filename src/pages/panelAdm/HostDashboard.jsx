import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, Building2, Bed, CalendarDays, CalendarCheck,
  Settings, Plus, ChevronLeft, ChevronRight,
  Eye, Check, X, MessageSquare, SquarePen,
  Percent, Phone, Wrench, MessageCircle, Banknote,
} from "lucide-react";
import "./HostDashboard.css";
import {
  getMyAccommodation, getRoomsByAccommodation, getOwnerBookings,
  confirmOwnerBooking, cancelOwnerBooking, createOwnerRoom,
  updateOwnerRoom, updateMyAccommodation, createOwnerBooking,
} from "../../services/host.services.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "sonner";

const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS_OF_WEEK = ["D","L","M","X","J","V","S"];

const FILTER_OPTIONS = [
  { key: "todos",      label: "Todos" },
  { key: "aprobados",  label: "Aprobados" },
  { key: "rechazados", label: "Rechazados" },
  { key: "pendientes", label: "Pendientes" },
];

const SIDEBAR_NAV = [
  { icon: Home,         label: "Resumen",       path: "/host/dashboard" },
  { icon: Bed,          label: "Habitaciones",   path: "/host/rooms" },
  { icon: CalendarDays, label: "Calendario",     path: "/host/calendar" },
  { icon: Settings,     label: "Configuración",  path: "/host/settings" },
];

const QUICK_SETTINGS = [
  { icon: Percent,      title: "Ajustar seña",          subtitle: "Modificar porcentaje" },
  { icon: MessageSquare,title: "Editar WhatsApp",        subtitle: "Gestionar número" },
  { icon: Phone,        title: "Datos de contacto",      subtitle: "Información pública" },
  { icon: Wrench,       title: "Servicios del hospedaje",subtitle: "Editar amenities" },
];

// Componente reutilizable para modales
function Modal({ onClose, title, children, footer }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <div className="modal-actions">{footer}</div>
      </div>
    </div>
  );
}

export default function HostDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accommodation, setAccommodation]   = useState(null);
  const [rooms, setRooms]                   = useState([]);
  const [bookings, setBookings]             = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [bookingFilter, setBookingFilter]   = useState("todos");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [viewDate, setViewDate]             = useState(new Date());

  // Estados de modales
  const [showRoomModal,          setShowRoomModal]          = useState(false);
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showBookingModal,       setShowBookingModal]       = useState(false);

  // Estados de formularios
  const [savingRoom,          setSavingRoom]          = useState(false);
  const [savingAccommodation, setSavingAccommodation] = useState(false);
  const [savingBooking,       setSavingBooking]       = useState(false);
  const [editingRoom,         setEditingRoom]         = useState(null);

  const [roomForm, setRoomForm] = useState({ name: "", description: "", maxCapacity: "", pricePerNight: "", images: [] });
  const [accommodationForm, setAccommodationForm] = useState({ name: "", description: "", whatsapp: "", depositPercentage: "", mainImage: null, gallery: [] });
  const [bookingForm, setBookingForm] = useState({ guestEmail: "", room: "", checkIn: "", checkOut: "" });

  // ── Carga inicial ──────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setLoadingDashboard(true);
        const myAccommodation = await getMyAccommodation();
        setAccommodation(myAccommodation);
        const [roomsData, bookingsData] = await Promise.all([
          getRoomsByAccommodation(myAccommodation._id),
          getOwnerBookings(),
        ]);
        setRooms(roomsData);
        setBookings(bookingsData);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error al cargar el panel");
      } finally {
        setLoadingDashboard(false);
      }
    };
    load();
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const formatPrice = (price) => Number(price || 0).toLocaleString("es-AR");

  const formatBookingDates = (checkIn, checkOut) => {
    const opts = { day: "2-digit", month: "short" };
    return `${new Date(checkIn).toLocaleDateString("es-AR", opts)} - ${new Date(checkOut).toLocaleDateString("es-AR", opts)}`;
  };

  const formatBookingStatus = (status) =>
    ({ pendiente: "Pendiente", confirmada: "Confirmada", cancelada: "Cancelada", completada: "Completada" }[status] || status);

  const getDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getBookingDateKeys = (checkIn, checkOut) => {
    const dates = [];
    const cur = new Date(checkIn);
    const end = new Date(checkOut);
    cur.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    while (cur < end) { dates.push(getDateKey(cur)); cur.setDate(cur.getDate() + 1); }
    return dates;
  };

  const getCalendarDayStatus = (day) => {
    const key = getDateKey(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
    if (bookings.some((b) => b.status === "confirmada" && getBookingDateKeys(b.checkIn, b.checkOut).includes(key))) return "occupied";
    if (bookings.some((b) => b.status === "pendiente"  && getBookingDateKeys(b.checkIn, b.checkOut).includes(key))) return "pending";
    return "";
  };

  const getCalendarDayBookings = (day) => {
    const key = getDateKey(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
    return bookings.filter((b) => b.status !== "cancelada" && getBookingDateKeys(b.checkIn, b.checkOut).includes(key));
  };

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === "aprobados")  return b.status === "confirmada";
    if (bookingFilter === "rechazados") return b.status === "cancelada";
    if (bookingFilter === "pendientes") return b.status === "pendiente";
    return true;
  });

  // ── Handlers de navegación ─────────────────────────────────────────────────
  const handleSidebarNav = (path) => {
    navigate(path === "/host/dashboard" ? path : "/404");
    setIsSidebarOpen(false);
  };

  // ── Handlers de reservas ───────────────────────────────────────────────────
  const handleConfirmBooking = async (id) => {
    try {
      const res = await confirmOwnerBooking(id);
      toast.success(res.message);
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: "confirmada" } : b));
    } catch (e) { toast.error(e.response?.data?.message || "Error al confirmar"); }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("¿Querés cancelar esta reserva?")) return;
    try {
      const res = await cancelOwnerBooking(id);
      toast.success(res.message);
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: "cancelada" } : b));
    } catch (e) { toast.error(e.response?.data?.message || "Error al cancelar"); }
  };

  const handleCreateBooking = async () => {
    const { guestEmail, room, checkIn, checkOut } = bookingForm;
    if (!guestEmail || !room || !checkIn || !checkOut) { toast.error("Completá todos los campos"); return; }
    try {
      setSavingBooking(true);
      const res = await createOwnerBooking(bookingForm);
      toast.success(res.message);
      setBookings((prev) => [res.booking, ...prev]);
      setBookingForm({ guestEmail: "", room: "", checkIn: "", checkOut: "" });
      setShowBookingModal(false);
    } catch (e) { toast.error(e.response?.data?.message || "Error al crear reserva"); }
    finally { setSavingBooking(false); }
  };

  // ── Handlers de habitaciones ───────────────────────────────────────────────
  const handleOpenEditRoom = (room) => {
    setEditingRoom(room);
    setRoomForm({ name: room.name || "", description: room.description || "", maxCapacity: room.maxCapacity || "", pricePerNight: room.pricePerNight || "", images: [] });
    setShowRoomModal(true);
  };

  const handleCloseRoomModal = () => {
    setShowRoomModal(false);
    setEditingRoom(null);
    setRoomForm({ name: "", description: "", maxCapacity: "", pricePerNight: "", images: [] });
  };

  const handleSaveRoom = async () => {
    if (!accommodation?._id) { toast.error("No se encontró el hospedaje"); return; }
    const { name, description, maxCapacity, pricePerNight, images } = roomForm;
    if (!name || !description || !maxCapacity || !pricePerNight) { toast.error("Completá todos los campos"); return; }
    try {
      setSavingRoom(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("maxCapacity", maxCapacity);
      formData.append("pricePerNight", pricePerNight);
      images.forEach((file) => formData.append("imagenes", file));
      if (editingRoom) {
        const res = await updateOwnerRoom(editingRoom._id, formData);
        toast.success(res.message || "Habitación actualizada");
        setRooms((prev) => prev.map((r) => r._id === editingRoom._id ? (res.room || res.habitacion || res) : r));
      } else {
        formData.append("accommodation", accommodation._id);
        const res = await createOwnerRoom(formData);
        toast.success(res.message || "Habitación creada");
        setRooms((prev) => [...prev, res.room]);
      }
      handleCloseRoomModal();
    } catch (e) { toast.error(e.response?.data?.message || "Error al guardar habitación"); }
    finally { setSavingRoom(false); }
  };

  // ── Handlers de hospedaje ──────────────────────────────────────────────────
  const handleOpenAccommodationModal = () => {
    if (!accommodation) { toast.error("No se encontró el hospedaje"); return; }
    setAccommodationForm({ name: accommodation.name || "", description: accommodation.description || "", whatsapp: accommodation.whatsapp || "", depositPercentage: accommodation.depositPercentage ?? "", mainImage: null, gallery: [] });
    setShowAccommodationModal(true);
  };

  const handleSaveAccommodation = async () => {
    if (!accommodation?._id) { toast.error("No se encontró el hospedaje"); return; }
    const { name, description, whatsapp, depositPercentage, mainImage, gallery } = accommodationForm;
    if (!name || !description || !whatsapp) { toast.error("Completá nombre, descripción y WhatsApp"); return; }
    try {
      setSavingAccommodation(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("whatsapp", whatsapp);
      formData.append("depositPercentage", Number(depositPercentage || 0));
      if (mainImage) formData.append("mainImage", mainImage);
      gallery.forEach((file) => formData.append("gallery", file));
      const res = await updateMyAccommodation(accommodation._id, formData);
      toast.success(res.message || "Hospedaje actualizado");
      setAccommodation(res.accommodation || res.hospedaje || res);
      setShowAccommodationModal(false);
    } catch (e) { toast.error(e.response?.data?.message || "Error al actualizar"); }
    finally { setSavingAccommodation(false); }
  };

  // ── Calendario ─────────────────────────────────────────────────────────────
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth   = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="host-dashboard-wrapper">
      <button className="mobile-sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Abrir menú lateral">☰</button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="accommodation-name" onClick={handleOpenAccommodationModal}>
            {accommodation?.name || "Mi hospedaje"}
          </h2>
          <p className="admin-panel-subtitle">Panel Administrativo</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="active" onClick={() => handleSidebarNav("/host/dashboard")}>
              <Home size={16} /> Resumen
            </li>
            <li onClick={handleOpenAccommodationModal}>
              <Building2 size={16} /> Mi hospedaje
            </li>
            <li onClick={() => document.getElementById("bookings-section")?.scrollIntoView({ behavior: "smooth" })}>
              <CalendarCheck size={16} /> Reservas
            </li>
            {SIDEBAR_NAV.slice(1).map(({ icon: Icon, label, path }) => (
              <li key={path} onClick={() => handleSidebarNav(path)}>
                <Icon size={16} /> {label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-new-room" onClick={() => setShowRoomModal(true)}>
            <Plus size={14} /> Nueva habitación
          </button>
          <div className="user-info">
            <span className="user-name">{user?.fullName || accommodation?.admin?.fullName || "Administrador"}</span>
            <span className="user-role">Administrador</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-text">
            <h1 className="page-title">Panel de Control</h1>
            <p className="page-subtitle">Gestioná reservas, habitaciones y disponibilidad de tu hospedaje.</p>
          </div>
          <div className="top-bar-actions">
            <button className="btn-new-booking" onClick={() => setShowBookingModal(true)}>
              <Plus size={16} /> Nueva reserva
            </button>
            <span className="badge badge-whatsapp"><MessageCircle size={14} /> WhatsApp activo</span>
            <span className="badge badge-deposit"><Banknote size={14} /> Seña configurada</span>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="dashboard-top-row">
            {/* Calendario */}
            <section className="calendar-section card">
              <h2 className="section-title">Calendario de Ocupación</h2>
              <div className="calendar-header-nav">
                <button className="calendar-nav-btn" onClick={() => setViewDate(new Date(year, month - 1, 1))} aria-label="Mes anterior"><ChevronLeft size={18} /></button>
                <h3 className="calendar-month-year">{MONTHS[month]} {year}</h3>
                <button className="calendar-nav-btn" onClick={() => setViewDate(new Date(year, month + 1, 1))} aria-label="Mes siguiente"><ChevronRight size={18} /></button>
              </div>
              <div className="calendar-grid">
                {DAYS_OF_WEEK.map((d) => <div key={d} className="calendar-weekday">{d}</div>)}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} className="calendar-day empty" />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayBookings = getCalendarDayBookings(day);
                  return (
                    <div key={day} className={`calendar-day ${getCalendarDayStatus(day)}`}>
                      {day}
                      {dayBookings.length > 0 && (
                        <div className="calendar-tooltip">
                          {dayBookings.map((b) => (
                            <div key={b._id} className="calendar-tooltip-item">
                              <strong>{b.user?.fullName || b.user?.email || "Cliente"}</strong>
                              <span>{b.room?.name || "Habitación"}</span>
                              <small>{formatBookingStatus(b.status)}</small>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="calendar-continuity-text">El calendario continúa...</p>
            </section>

            {/* Habitaciones */}
            <section className="rooms-section card">
              <div className="section-header-with-button">
                <h2 className="section-title">Habitaciones</h2>
                <button className="btn-new-room-small" onClick={() => setShowRoomModal(true)}><Plus size={16} /> Nueva</button>
              </div>
              <div className="rooms-list">
                {loadingDashboard ? <p>Cargando habitaciones...</p>
                  : rooms.length === 0 ? <p>No hay habitaciones cargadas.</p>
                  : rooms.map((room) => (
                    <div key={room._id} className="room-card-compact">
                      <div className="room-info-compact">
                        <h4 className="room-name-compact">{room.name}</h4>
                        <p className="room-price-compact">${room.pricePerNight.toLocaleString()} / noche</p>
                        <span className={`room-status-compact ${room.status.toLowerCase()}`}>{room.status}</span>
                      </div>
                      <button className="action-icon-btn" title="Editar habitación" onClick={() => handleOpenEditRoom(room)}>
                        <SquarePen size={16} />
                      </button>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* Reservas */}
          <section id="bookings-section" className="recent-bookings-section card">
            <h2 className="section-title">Reservas</h2>

            <div className="booking-filters">
              {FILTER_OPTIONS.map(({ key, label }) => (
                <button key={key} className={`filter-btn ${bookingFilter === key ? "active" : ""}`} onClick={() => setBookingFilter(key)}>
                  {label}
                </button>
              ))}
            </div>

            <div className="bookings-table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Cliente</th><th>Habitación</th><th>Fechas</th><th>Estado</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingDashboard ? (
                    <tr><td colSpan="5">Cargando reservas...</td></tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr><td colSpan="5">No hay reservas para este filtro.</td></tr>
                  ) : filteredBookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.user?.fullName || b.user?.email || "Cliente"}</td>
                      <td>{b.room?.name || "Habitación"}</td>
                      <td>{formatBookingDates(b.checkIn, b.checkOut)}</td>
                      <td><span className={`status-badge ${b.status}`}>{formatBookingStatus(b.status)}</span></td>
                      <td className="booking-actions">
                        <button className="action-icon-btn" title="Ver detalle" onClick={() => setSelectedBooking(b)}><Eye size={14} /></button>
                        {(b.status === "pendiente" || b.status === "cancelada") && (
                          <button className="action-icon-btn" title={b.status === "cancelada" ? "Reactivar" : "Aprobar"} onClick={() => handleConfirmBooking(b._id)}><Check size={14} /></button>
                        )}
                        {b.status !== "cancelada" && (
                          <button className="action-icon-btn" title={b.status === "pendiente" ? "Rechazar" : "Cancelar"} onClick={() => handleCancelBooking(b._id)}><X size={14} /></button>
                        )}
                        <button className="action-icon-btn" title="Contactar por WhatsApp"><MessageSquare size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Configuración rápida */}
          <section className="quick-settings-section card">
            <h2 className="section-title">Configuración rápida</h2>
            <div className="quick-settings-grid">
              {QUICK_SETTINGS.map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="setting-card">
                  <Icon size={20} className="setting-icon" />
                  <div className="setting-text">
                    <h4 className="setting-title">{title}</h4>
                    <p className="setting-subtitle">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Modal: Habitación */}
      {showRoomModal && (
        <Modal title={editingRoom ? "Editar habitación" : "Nueva habitación"} onClose={handleCloseRoomModal}
          footer={<>
            <button onClick={handleCloseRoomModal} disabled={savingRoom}>Cancelar</button>
            <button onClick={handleSaveRoom} disabled={savingRoom}>{savingRoom ? "Guardando..." : editingRoom ? "Guardar cambios" : "Crear habitación"}</button>
          </>}>
          <input name="name" placeholder="Nombre de la habitación" value={roomForm.name} onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })} />
          <textarea name="description" placeholder="Descripción" value={roomForm.description} onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })} />
          <input name="maxCapacity" type="number" placeholder="Capacidad máxima" value={roomForm.maxCapacity} onChange={(e) => setRoomForm({ ...roomForm, maxCapacity: e.target.value })} />
          <input name="pricePerNight" type="number" placeholder="Precio por noche" value={roomForm.pricePerNight} onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: e.target.value })} />
          <label className="file-input-label">
            Imágenes {editingRoom ? "(opcional, reemplazan las actuales)" : "(opcional, hasta 5)"}
            <input name="imagenes" type="file" accept="image/*" multiple onChange={(e) => setRoomForm({ ...roomForm, images: Array.from(e.target.files) })} />
          </label>
        </Modal>
      )}

      {/* Modal: Hospedaje */}
      {showAccommodationModal && (
        <Modal title="Editar hospedaje" onClose={() => setShowAccommodationModal(false)}
          footer={<>
            <button onClick={() => setShowAccommodationModal(false)} disabled={savingAccommodation}>Cancelar</button>
            <button onClick={handleSaveAccommodation} disabled={savingAccommodation}>{savingAccommodation ? "Guardando..." : "Guardar cambios"}</button>
          </>}>
          <input name="name" placeholder="Nombre del hospedaje" value={accommodationForm.name} onChange={(e) => setAccommodationForm({ ...accommodationForm, name: e.target.value })} />
          <textarea name="description" placeholder="Descripción del hospedaje" value={accommodationForm.description} onChange={(e) => setAccommodationForm({ ...accommodationForm, description: e.target.value })} />
          <input name="whatsapp" placeholder="WhatsApp" value={accommodationForm.whatsapp} onChange={(e) => setAccommodationForm({ ...accommodationForm, whatsapp: e.target.value })} />
          <input name="depositPercentage" type="number" placeholder="Porcentaje de seña" value={accommodationForm.depositPercentage} onChange={(e) => setAccommodationForm({ ...accommodationForm, depositPercentage: e.target.value })} />
          <label className="file-input-label">
            Imagen principal (opcional, reemplaza la actual)
            <input name="mainImage" type="file" accept="image/*" onChange={(e) => setAccommodationForm({ ...accommodationForm, mainImage: e.target.files[0] || null })} />
          </label>
          <label className="file-input-label">
            Galería (opcional, hasta 5)
            <input name="gallery" type="file" accept="image/*" multiple onChange={(e) => setAccommodationForm({ ...accommodationForm, gallery: Array.from(e.target.files) })} />
          </label>
        </Modal>
      )}

      {/* Modal: Nueva reserva */}
      {showBookingModal && (
        <Modal title="Nueva reserva" onClose={() => setShowBookingModal(false)}
          footer={<>
            <button onClick={() => setShowBookingModal(false)} disabled={savingBooking}>Cancelar</button>
            <button onClick={handleCreateBooking} disabled={savingBooking}>{savingBooking ? "Creando..." : "Crear reserva"}</button>
          </>}>
          <input name="guestEmail" type="email" placeholder="Email del cliente registrado" value={bookingForm.guestEmail} onChange={(e) => setBookingForm({ ...bookingForm, guestEmail: e.target.value })} />
          <select name="room" value={bookingForm.room} onChange={(e) => setBookingForm({ ...bookingForm, room: e.target.value })}>
            <option value="">Seleccionar habitación</option>
            {rooms.map((r) => <option key={r._id} value={r._id}>{r.name} - ${r.pricePerNight}</option>)}
          </select>
          <input name="checkIn" type="date" value={bookingForm.checkIn} onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })} />
          <input name="checkOut" type="date" value={bookingForm.checkOut} onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })} />
        </Modal>
      )}

      {/* Modal: Detalle de reserva */}
      {selectedBooking && (
        <Modal title="Detalle de reserva" onClose={() => setSelectedBooking(null)}
          footer={<button onClick={() => setSelectedBooking(null)}>Cerrar</button>}>
          <div className="booking-detail-list">
            {[
              ["Cliente",    selectedBooking.user?.fullName || selectedBooking.user?.email || "Cliente"],
              ["Email",      selectedBooking.user?.email || "Sin email"],
              ["Habitación", selectedBooking.room?.name || "Habitación"],
              ["Fechas",     formatBookingDates(selectedBooking.checkIn, selectedBooking.checkOut)],
              ["Estado",     formatBookingStatus(selectedBooking.status)],
              ["Total",      `$${formatPrice(selectedBooking.totalPrice)}`],
            ].map(([label, value]) => (
              <p key={label}><strong>{label}:</strong> {value}</p>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
