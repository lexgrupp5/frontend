import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "Mattias31" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "Qwerty1234" : "";
}