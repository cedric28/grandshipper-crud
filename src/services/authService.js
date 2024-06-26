import http from './http';
import { jwtDecode } from "jwt-decode";

const apiUrl = "/auth";
const tokenKey = "token";

const getJWT = () => {
  return localStorage.getItem(tokenKey);
};

setTimeout(() => {  
  http.setJWT(getJWT());
}, 1000);

const authService = {
  login: async (email, password) => {
    const { data: token } = await http.post(apiUrl, { email, password });
    localStorage.setItem(tokenKey, token);
  },
  loginWithJWT: (token) => {
    localStorage.setItem(tokenKey, token);
  },
  logout: () => {
    localStorage.removeItem(tokenKey);
  },
  getCurrentUser: () => {
    try {
      const token = localStorage.getItem(tokenKey);
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  },
  getJWT: getJWT  // Assign the getJWT function to the object property
};

export default authService;
