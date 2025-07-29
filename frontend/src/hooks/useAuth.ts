import { api } from "@/lib/api";
import Cookies from "js-cookie";

export async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}) {
  return api.post("/auth/register", data);
}

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  Cookies.set("token", res.data.token);
  Cookies.set("role", res.data.user.role);
  return res;
}

export function logout() {
  Cookies.remove("token");
}
