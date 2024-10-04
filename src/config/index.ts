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
  if (isProduction()) { return ""; }
  return import.meta.env.VITE_USERNAME != null
    ? import.meta.env.VITE_USERNAME
    : "";
}

export function getDefaultPwd() {
  if (isProduction()) { return ""; }
  return import.meta.env.VITE_PWD != null
    ? import.meta.env.VITE_PWD
    : "";
}
