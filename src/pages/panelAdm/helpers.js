// Helpers de formato compartidos por el panel del owner y sus modales.

export const formatPrice = (price) => Number(price || 0).toLocaleString("es-AR");

export const formatBookingDates = (checkIn, checkOut) => {
  const opts = { day: "2-digit", month: "short" };
  return `${new Date(checkIn).toLocaleDateString("es-AR", opts)} - ${new Date(checkOut).toLocaleDateString("es-AR", opts)}`;
};

export const formatBookingStatus = (status) =>
  ({ pendiente: "Pendiente", confirmada: "Confirmada", cancelada: "Cancelada", completada: "Completada" }[status] || status);
