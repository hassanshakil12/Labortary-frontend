import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  _id: string;
  role: string;
  exp: number;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem("userAuthToken");
};

export const getUserRole = (): string | null => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role;
  } catch (e) {
    return null;
  }
};

export const isTokenValid = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const { exp } = jwtDecode<DecodedToken>(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
