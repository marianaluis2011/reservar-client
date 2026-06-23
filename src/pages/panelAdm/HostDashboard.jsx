import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Building2,
  ListChecks,
  Bed,
  CalendarDays,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
  MessageSquare,
  SquarePen,
  Percent,
  Phone,
  Wrench,
  MessageCircle,
  Banknote,
} from "lucide-react";
import "./HostDashboard.css";
import { getMyAccommodation, getRoomsByAccommodation, getOwnerBookings, confirmOwnerBooking, cancelOwnerBooking, createOwnerRoom, updateOwnerRoom, updateMyAccommodation, createOwnerBooking } from "../../services/host.services.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "sonner";

// Mock Data (as provided in the prompt)
const dashboardData = {
  accommodationName: "Hostal del Norte",
  adminName: "Carlos Mendoza",
  rooms: [
    {
      id: 1,
      name: "Queen 204",
      pricePerNight: 24000,
      status: "Activa",
    },
    {
      id: 2,
      name: "Deluxe 301",
      pricePerNight: 48000,
      status: "Activa",
    },
    {
      id: 3,
      name: "Nupcial 102",
      pricePerNight: 65500,
      status: "Inactiva",
    },
  ],
  recentBookings: [
    {
      id: 1,
      guestName: "Mariana Costa",
      roomName: "Queen 204",
      dates: "12 Oct - 15 Oct",
      status: "Confirmada",
    },
    {
      id: 2,
      guestName: "Roberto Jiménez",
      roomName: "Deluxe 301",
      dates: "18 Oct - 20 Oct",
      status: "Pendiente",
    },
    {
      id: 3,
      guestName: "Sofía Villalobos",
      roomName: "Nupcial 102",
      dates: "24 Oct - 26 Oct",
      status: "Cancelada",
    },
  ],
};

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAYS_OF_WEEK = ["D", "L", "M", "X", "J", "V", "S"];

export default function HostDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accommodation, setAccommodation] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [savingRoom, setSavingRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomForm, setRoomForm] = useState({
    name: "",
    description: "",
    maxCapacity: "",
    pricePerNight: ""
  });
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [savingAccommodation, setSavingAccommodation] = useState(false);
  const [accommodationForm, setAccommodationForm] = useState({
    name: "",
    description: "",
    whatsapp: "",
    depositPercentage: ""
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [savingBooking, setSavingBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    guestEmail: "",
    room: "",
    checkIn: "",
    checkOut: ""
  });

  const [viewDate, setViewDate] = useState(new Date());
  useEffect(() => {
    const loadOwnerDashboard = async () => {
      try {
        setLoadingDashboard(true);
        const myAccommodation = await getMyAccommodation();
        setAccommodation(myAccommodation);
        const [roomsData, bookingsData] = await Promise.all([
          getRoomsByAccommodation(myAccommodation._id),
          getOwnerBookings()
        ]);
        setRooms(roomsData);
        setBookings(bookingsData);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error al cargar el panel del hospedaje");
      } finally {
        setLoadingDashboard(false);
      }
    };
    loadOwnerDashboard();
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSidebarNavigation = (path) => {
    if (path === "/host/dashboard") {
      navigate(path);
    } else {
      navigate("/404"); // Redirect to 404 for unimplemented views
    }
    setIsSidebarOpen(false); // Close sidebar on navigation for mobile
  };

  const formatBookingDates = (checkIn, checkOut) => {
    const options = { day: "2-digit", month: "short" };
    const start = new Date(checkIn).toLocaleDateString("es-AR", options);
    const end = new Date(checkOut).toLocaleDateString("es-AR", options);
    return `${start} - ${end}`;
  };

  const formatBookingStatus = (status) => {
    const labels = {
      pendiente: "Pendiente",
      confirmada: "Confirmada",
      cancelada: "Cancelada",
      completada: "Completada",
    };
    return labels[status] || status;
  };

  const handleConfirmBooking = async (bookingId) => {
    try {
      const res = await confirmOwnerBooking(bookingId);
      toast.success(res.message);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: "confirmada" } : booking
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al confirmar la reserva");
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("¿Querés cancelar esta reserva?");
    if (!confirmCancel) return;

    try {
      const res = await cancelOwnerBooking(bookingId);
      toast.success(res.message);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: "cancelada" } : booking
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al cancelar la reserva");
    }
  };

  const handleRoomFormChange = (e) => {
    setRoomForm({ ...roomForm, [e.target.name]: e.target.value });
  };

  const handleSaveRoom = async () => {
    if (!accommodation?._id) {
      toast.error("No se encontró el hospedaje del owner");
      return;
    }

    if (!roomForm.name || !roomForm.description || !roomForm.maxCapacity || !roomForm.pricePerNight) {
      toast.error("Completá todos los campos");
      return;
    }

    try {
      setSavingRoom(true);

      if (editingRoom) {
        const res = await updateOwnerRoom(editingRoom._id, {
          name: roomForm.name,
          description: roomForm.description,
          maxCapacity: Number(roomForm.maxCapacity),
          pricePerNight: Number(roomForm.pricePerNight)
        });

        toast.success(res.message || "Habitación actualizada correctamente");
        setRooms((prev) =>
          prev.map((room) => room._id === editingRoom._id ? (res.room || res.habitacion || res) : room)
        );
      } else {
        const res = await createOwnerRoom({
          name: roomForm.name,
          description: roomForm.description,
          maxCapacity: Number(roomForm.maxCapacity),
          pricePerNight: Number(roomForm.pricePerNight),
          accommodation: accommodation._id
        });

        toast.success(res.message || "Habitación creada correctamente");
        setRooms((prev) => [...prev, res.room]);
      }

      setRoomForm({ name: "", description: "", maxCapacity: "", pricePerNight: "" });
      setEditingRoom(null);
      setShowRoomModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al guardar habitación");
    } finally {
      setSavingRoom(false);
    }
  };

  const handleOpenEditRoom = (room) => {
    setEditingRoom(room);
    setRoomForm({
      name: room.name || "",
      description: room.description || "",
      maxCapacity: room.maxCapacity || "",
      pricePerNight: room.pricePerNight || ""
    });
    setShowRoomModal(true);
  };

  const handleOpenAccommodationModal = () => {
    if (!accommodation) {
      toast.error("No se encontró el hospedaje");
      return;
    }

    setAccommodationForm({
      name: accommodation.name || "",
      description: accommodation.description || "",
      whatsapp: accommodation.whatsapp || "",
      depositPercentage: accommodation.depositPercentage ?? ""
    });

    setShowAccommodationModal(true);
  };

  const handleAccommodationFormChange = (e) => {
    setAccommodationForm({ ...accommodationForm, [e.target.name]: e.target.value });
  };

  const handleSaveAccommodation = async () => {
    if (!accommodation?._id) {
      toast.error("No se encontró el hospedaje");
      return;
    }

    if (!accommodationForm.name || !accommodationForm.description || !accommodationForm.whatsapp) {
      toast.error("Completá nombre, descripción y WhatsApp");
      return;
    }

    try {
      setSavingAccommodation(true);

      const res = await updateMyAccommodation(accommodation._id, {
        name: accommodationForm.name,
        description: accommodationForm.description,
        whatsapp: accommodationForm.whatsapp,
        depositPercentage: Number(accommodationForm.depositPercentage || 0)
      });

      toast.success(res.message || "Hospedaje actualizado correctamente");
      setAccommodation(res.accommodation || res.hospedaje || res);
      setShowAccommodationModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar el hospedaje");
    } finally {
      setSavingAccommodation(false);
    }
  };

  const handleBookingFormChange = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleCreateBooking = async () => {
    if (!bookingForm.guestEmail || !bookingForm.room || !bookingForm.checkIn || !bookingForm.checkOut) {
      toast.error("Completá cliente, habitación y fechas");
      return;
    }

    try {
      setSavingBooking(true);

      const res = await createOwnerBooking({
        guestEmail: bookingForm.guestEmail,
        room: bookingForm.room,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut
      });

      toast.success(res.message);
      setBookings((prev) => [res.booking, ...prev]);
      setBookingForm({ guestEmail: "", room: "", checkIn: "", checkOut: "" });
      setShowBookingModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear reserva");
    } finally {
      setSavingBooking(false);
    }
  };

  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getBookingDateKeys = (checkIn, checkOut) => {
    const dates = [];
    const current = new Date(checkIn);
    const end = new Date(checkOut);

    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    while (current < end) {
      dates.push(getDateKey(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const getCalendarDayStatus = (day) => {
    const currentDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const currentKey = getDateKey(currentDate);
    const confirmedBooking = bookings.some((booking) => {
      if (booking.status !== "confirmada") return false;
      return getBookingDateKeys(booking.checkIn, booking.checkOut).includes(currentKey);
    });
    if (confirmedBooking) {
      return "occupied";
    }
    const pendingBooking = bookings.some((booking) => {
      if (booking.status !== "pendiente") return false;
      return getBookingDateKeys(booking.checkIn, booking.checkOut).includes(currentKey);
    });
    if (pendingBooking) {
      return "pending";
    }
    return "";
  };

  const getCalendarDayBookings = (day) => {
    const currentDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const currentKey = getDateKey(currentDate);

    return bookings.filter((booking) => {
      if (booking.status === "cancelada") return false;
      return getBookingDateKeys(booking.checkIn, booking.checkOut).includes(currentKey);
    });
  };

  return (
    <div className="host-dashboard-wrapper">
      {/* Mobile Sidebar Toggle */}
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Abrir menú lateral"
      >
        ☰
      </button>

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
            <li
              className="active"
              onClick={() => handleSidebarNavigation("/host/dashboard")}
            >
              <Home size={16} /> Resumen
            </li>
            <li onClick={handleOpenAccommodationModal}>
              <Building2 size={16} /> Mi hospedaje
            </li>
            <li onClick={() => handleSidebarNavigation("/host/bookings")}>
              <ListChecks size={16} /> Reservas
            </li>
            <li onClick={() => handleSidebarNavigation("/host/rooms")}>
              <Bed size={16} /> Habitaciones
            </li>
            <li onClick={() => handleSidebarNavigation("/host/calendar")}>
              <CalendarDays size={16} /> Calendario
            </li>
            <li onClick={() => handleSidebarNavigation("/host/settings")}>
              <Settings size={16} /> Configuración
            </li>
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

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-text">
            <h1 className="page-title">Panel de Control</h1>
            <p className="page-subtitle">
              Gestioná reservas, habitaciones y disponibilidad de tu hospedaje.
            </p>
          </div>
          <div className="top-bar-actions">
            <button className="btn-new-booking" onClick={() => setShowBookingModal(true)}>
              <Plus size={16} /> Nueva reserva
            </button>
            <span className="badge badge-whatsapp">
              <MessageCircle size={14} /> WhatsApp activo
            </span>
            <span className="badge badge-deposit">
              <Banknote size={14} /> Seña configurada
            </span>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Fila Superior: Calendario y Habitaciones */}
          <div className="dashboard-top-row">
            {/* Calendar */}
            <section className="calendar-section card">
              <h2 className="section-title">Calendario de Ocupación</h2>
              <div className="calendar-header-nav">
                <button onClick={handlePrevMonth} className="calendar-nav-btn" aria-label="Mes anterior" type="button">
                  <ChevronLeft size={18} />
                </button>
                <h3 className="calendar-month-year">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </h3>
                <button onClick={handleNextMonth} className="calendar-nav-btn" aria-label="Mes siguiente" type="button">
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="calendar-grid">
                {MONTHS.length > 0 && DAYS_OF_WEEK.map((d) => (
                  <div key={d} className="calendar-weekday">
                    {d}
                  </div>
                ))}
                {Array.from({
                  length: getFirstDayOfMonth(
                    viewDate.getFullYear(),
                    viewDate.getMonth()
                  ),
                }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-day empty" />
                ))}
                {Array.from({
                  length: getDaysInMonth(
                    viewDate.getFullYear(),
                    viewDate.getMonth()
                  ),
                }).map((_, i) => {
                  const day = i + 1;
                  const status = getCalendarDayStatus(day);
                  const dayBookings = getCalendarDayBookings(day);
                  return (
                    <div key={day} className={`calendar-day ${status}`}>
                      {day}

                      {dayBookings.length > 0 && (
                        <div className="calendar-tooltip">
                          {dayBookings.map((booking) => (
                            <div key={booking._id} className="calendar-tooltip-item">
                              <strong>{booking.user?.fullName || booking.user?.email || "Cliente"}</strong>
                              <span>{booking.room?.name || "Habitación"}</span>
                              <small>{formatBookingStatus(booking.status)}</small>
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

            {/* Rooms (Ahora al lado del calendario) */}
            <section className="rooms-section card">
              <div className="section-header-with-button">
                <h2 className="section-title">Habitaciones</h2>
                <button className="btn-new-room-small" onClick={() => setShowRoomModal(true)}>
                  <Plus size={16} /> Nueva
                </button>
              </div>
              <div className="rooms-list">
                {loadingDashboard ? (
                  <p>Cargando habitaciones...</p>
                ) : rooms.length === 0 ? (
                  <p>No hay habitaciones cargadas.</p>
                ) : (
                  rooms.map((room) => (
                    <div key={room._id} className="room-card-compact">
                      <div className="room-info-compact">
                        <h4 className="room-name-compact">{room.name}</h4>
                        <p className="room-price-compact">
                          ${room.pricePerNight.toLocaleString()} / noche
                        </p>
                        <span className={`room-status-compact ${room.status.toLowerCase()}`}>
                          {room.status}
                        </span>
                      </div>
                      <button className="action-icon-btn" title="Editar habitación" onClick={() => handleOpenEditRoom(room)}>
                        <SquarePen size={16} />
                      </button>
                    </div>
                  )))}
              </div>
            </section>
          </div>

          {/* Reservas Recientes (Ancho completo debajo) */}
          <section className="recent-bookings-section card">
            <div className="section-header-with-button">
              <h2 className="section-title">Reservas Recientes</h2>
              <button className="btn-link">Ver todas</button>
            </div>
            <div className="bookings-table-container">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Habitación</th>
                    <th>Fechas</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingDashboard ? (
                    <tr>
                      <td colSpan="5">Cargando reservas...</td>
                    </tr>
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan="5">No hay reservas registradas.</td>
                    </tr>
                  ) : (
                    bookings.slice(0, 5).map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.user?.fullName || booking.user?.email || "Cliente"}</td>
                        <td>{booking.room?.name || "Habitación"}</td>
                        <td>{formatBookingDates(booking.checkIn, booking.checkOut)}</td>
                        <td>
                          <span className={`status-badge ${booking.status}`}>
                            {formatBookingStatus(booking.status)}
                          </span>
                        </td>
                        <td className="booking-actions">
                          <button className="action-icon-btn" title="Ver detalle">
                            <Eye size={14} />
                          </button>
                          {(booking.status === "pendiente" || booking.status === "cancelada") && (
                            <button
                              className="action-icon-btn"
                              title={booking.status === "cancelada" ? "Reactivar reserva" : "Aprobar reserva"}
                              onClick={() => handleConfirmBooking(booking._id)}
                            >
                              <Check size={14} />
                            </button>
                          )}
                          {booking.status !== "cancelada" && (
                            <button
                              className="action-icon-btn"
                              title={booking.status === "pendiente" ? "Rechazar reserva" : "Cancelar reserva"}
                              onClick={() => handleCancelBooking(booking._id)}
                            >
                              <X size={14} />
                            </button>
                          )}
                          <button className="action-icon-btn" title="Contactar por WhatsApp">
                            <MessageSquare size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="quick-settings-section card">
            <h2 className="section-title">Configuración rápida</h2>
            <div className="quick-settings-grid">
              <div className="setting-card">
                <Percent size={20} className="setting-icon" />
                <div className="setting-text">
                  <h4 className="setting-title">Ajustar seña</h4>
                  <p className="setting-subtitle">Modificar porcentaje</p>
                </div>
              </div>
              <div className="setting-card">
                <MessageSquare size={20} className="setting-icon" />
                <div className="setting-text">
                  <h4 className="setting-title">Editar WhatsApp</h4>
                  <p className="setting-subtitle">Gestionar número</p>
                </div>
              </div>
              <div className="setting-card">
                <Phone size={20} className="setting-icon" />
                <div className="setting-text">
                  <h4 className="setting-title">Datos de contacto</h4>
                  <p className="setting-subtitle">Información pública</p>
                </div>
              </div>
              <div className="setting-card">
                <Wrench size={20} className="setting-icon" />
                <div className="setting-text">
                  <h4 className="setting-title">Servicios del hospedaje</h4>
                  <p className="setting-subtitle">Editar amenities</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {showRoomModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowRoomModal(false);
            setEditingRoom(null);
            setRoomForm({ name: "", description: "", maxCapacity: "", pricePerNight: "" });
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingRoom ? "Editar habitación" : "Nueva habitación"}</h3>
            <input
              name="name"
              placeholder="Nombre de la habitación"
              value={roomForm.name}
              onChange={handleRoomFormChange}
            />

            <textarea
              name="description"
              placeholder="Descripción"
              value={roomForm.description}
              onChange={handleRoomFormChange}
            />

            <input
              name="maxCapacity"
              type="number"
              placeholder="Capacidad máxima"
              value={roomForm.maxCapacity}
              onChange={handleRoomFormChange}
            />

            <input
              name="pricePerNight"
              type="number"
              placeholder="Precio por noche"
              value={roomForm.pricePerNight}
              onChange={handleRoomFormChange}
            />

            <div className="modal-actions">
              <button onClick={() => setShowRoomModal(false)} disabled={savingRoom}>
                Cancelar
              </button>
              <button onClick={handleSaveRoom} disabled={savingRoom}>
                {savingRoom ? "Guardando..." : editingRoom ? "Guardar cambios" : "Crear habitación"}
              </button>
            </div>
          </div>
        </div>
      )
      }
      {showAccommodationModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAccommodationModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Editar hospedaje</h3>

            <input
              name="name"
              placeholder="Nombre del hospedaje"
              value={accommodationForm.name}
              onChange={handleAccommodationFormChange}
            />

            <textarea
              name="description"
              placeholder="Descripción del hospedaje"
              value={accommodationForm.description}
              onChange={handleAccommodationFormChange}
            />

            <input
              name="whatsapp"
              placeholder="WhatsApp"
              value={accommodationForm.whatsapp}
              onChange={handleAccommodationFormChange}
            />

            <input
              name="depositPercentage"
              type="number"
              placeholder="Porcentaje de seña"
              value={accommodationForm.depositPercentage}
              onChange={handleAccommodationFormChange}
            />

            <div className="modal-actions">
              <button onClick={() => setShowAccommodationModal(false)} disabled={savingAccommodation}>
                Cancelar
              </button>
              <button onClick={handleSaveAccommodation} disabled={savingAccommodation}>
                {savingAccommodation ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Nueva reserva</h3>

            <input
              name="guestEmail"
              type="email"
              placeholder="Email del cliente registrado"
              value={bookingForm.guestEmail}
              onChange={handleBookingFormChange}
            />

            <select
              name="room"
              value={bookingForm.room}
              onChange={handleBookingFormChange}
            >
              <option value="">Seleccionar habitación</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.name} - ${room.pricePerNight}
                </option>
              ))}
            </select>

            <input
              name="checkIn"
              type="date"
              value={bookingForm.checkIn}
              onChange={handleBookingFormChange}
            />

            <input
              name="checkOut"
              type="date"
              value={bookingForm.checkOut}
              onChange={handleBookingFormChange}
            />

            <div className="modal-actions">
              <button onClick={() => setShowBookingModal(false)} disabled={savingBooking}>
                Cancelar
              </button>
              <button onClick={handleCreateBooking} disabled={savingBooking}>
                {savingBooking ? "Creando..." : "Crear reserva"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}