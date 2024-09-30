import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "Jessica27" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "Qwerty1234" : "";
}