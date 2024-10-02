export function getAPI (): string {
  return import.meta.env.VITE_API;
}

export function isDevelopment (): boolean {
  return !isProduction();
}

export function isProduction (): boolean {
  return import.meta.env.PROD;
}

export function getDefaultUsername() {
  return isDevelopment() ? import.meta.env.VITE_USERNAME : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? import.meta.env.VITE_PWD : "";
}
