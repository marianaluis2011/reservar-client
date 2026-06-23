import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = API_URL.replace("/auth", "");
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const getMyAccommodation = async () => {
    const { data } = await axios.get(`${API_BASE}/hospedajes/owner/me`, authHeader());
    return data;
};

export const getRoomsByAccommodation = async (accommodationId) => {
    const { data } = await axios.get(`${API_BASE}/habitaciones/hospedaje/${accommodationId}`);
    return data;
};

export const getOwnerBookings = async () => {
    const { data } = await axios.get(`${API_BASE}/reservas/owner`, authHeader());
    return data;
};

export const confirmOwnerBooking = async (bookingId) => {
    const { data } = await axios.patch(`${API_BASE}/reservas/${bookingId}/confirmar`, {}, authHeader());
    return data;
};

export const cancelOwnerBooking = async (bookingId) => {
    const { data } = await axios.patch(`${API_BASE}/reservas/${bookingId}/cancelar`, {}, authHeader());
    return data;
};

export const createOwnerRoom = async (roomData) => {
    const { data } = await axios.post(`${API_BASE}/habitaciones`, roomData, authHeader());
    return data;
};

export const updateOwnerRoom = async (roomId, roomData) => {
    const { data } = await axios.put(`${API_BASE}/habitaciones/${roomId}`, roomData, authHeader());
    return data;
};

export const updateMyAccommodation = async (accommodationId, accommodationData) => {
  const { data } = await axios.put(`${API_BASE}/hospedajes/${accommodationId}`, accommodationData, authHeader());
  return data;
};