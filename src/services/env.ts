import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "Max_Gustafsson64" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "Qwerty1234" : "";
}