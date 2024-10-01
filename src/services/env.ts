import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "Daniel_Bergman9" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "Qwerty1234" : "";
}