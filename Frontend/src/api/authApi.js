import axios from "axios";
const API = axios.create({ baseURL: "https://blogwebsite-73y4.onrender.com/" });

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
