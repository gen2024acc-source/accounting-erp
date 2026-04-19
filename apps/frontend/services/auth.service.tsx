import axios from "../lib/axios";

export const signup = async (email: string, password: string) => {
  return axios.post("/auth/signup", { email, password });
};

export const login = async (email: string, password: string) => {
  return axios.post("/auth/login", { email, password });
};