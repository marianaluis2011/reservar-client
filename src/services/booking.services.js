import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = API_URL.replace("/auth", "");
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const createBooking = async (bookingData) => {
  const { data } = await axios.post(`${API_BASE}/reservas`, bookingData, authHeader());
  return data;
};

export const getMyBookings = async () => {
  const { data } = await axios.get(`${API_BASE}/reservas`, authHeader());
  return data;
};