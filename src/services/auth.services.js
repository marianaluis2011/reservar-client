import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const { data } = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return data;

};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};