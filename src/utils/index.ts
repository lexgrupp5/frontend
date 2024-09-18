import { isDevelopment } from "@/config";

export function getDefaultUsername () {
  return isDevelopment() ? "dev_user": "";
}

export function getDefaultPwd () {
  return isDevelopment() ? "password": "";
}
