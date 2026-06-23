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