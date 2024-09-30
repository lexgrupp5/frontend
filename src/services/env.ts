import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "Robin98" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "Qwerty1234" : "";
}