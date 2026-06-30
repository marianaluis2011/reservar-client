import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = API_URL.replace("/auth", "");
const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getDashboardStats = async () => {
  const { data } = await axios.get(`${API_BASE}/admin/stats`, authHeader());
  return data;
};