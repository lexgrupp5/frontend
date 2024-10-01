import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "Gustav_Ali" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "Qwerty1234" : "";
}