import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// El back monta /api/usuarios, pero VITE_API_URL termina en /api/auth.
// Subimos un nivel para llegar a /api.
const API_BASE = API_URL.replace("/auth", "");

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getUsuarios = async () => {
  const { data } = await axios.get(`${API_BASE}/usuarios`, authHeader());
  return data;
};

export const cambiarEstadoUsuario = async (id, isActive) => {
  const { data } = await axios.patch(
    `${API_BASE}/usuarios/${id}/estado`,
    { isActive },
    authHeader()
  );
  return data;
};

export const crearAdmin = async (adminData) => {
  const { data } = await axios.post(`${API_URL}/register`, adminData, authHeader());
  return data;
};