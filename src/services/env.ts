import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "Bjorn.Lind" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "Qwerty1234" : "";
}