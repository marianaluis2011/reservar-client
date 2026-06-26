import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = API_URL.replace("/auth", "");
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });
export const getAllAccommodationsForAdmin = async () => {
  const { data } = await axios.get(`${API_BASE}/hospedajes/admin/todos`, authHeader());
  return data;
};
export const changeAccommodationStatus = async (id, status) => {
  const { data } = await axios.patch(`${API_BASE}/hospedajes/${id}/estado`, { status }, authHeader());
  return data;
};
export const getPublicAccommodations = async () => {
  const { data } = await axios.get(`${API_BASE}/hospedajes`);
  return data;
};

export const getAccommodationById = async (id) => {
  const { data } = await axios.get(`${API_BASE}/hospedajes/${id}`);
  return data;
};

export const getRoomsByAccommodation = async (accommodationId) => {
  const { data } = await axios.get(`${API_BASE}/habitaciones/hospedaje/${accommodationId}`);
  return data;
};

export const getRoomById = async (id) => {
  const { data } = await axios.get(`${API_BASE}/habitaciones/${id}`);
  return data;
};