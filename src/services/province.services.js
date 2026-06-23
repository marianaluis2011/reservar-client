import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = API_URL.replace("/auth", "");

export const getProvinces = async () => {
  const { data } = await axios.get(`${API_BASE}/provincias`);
  return data;
};
