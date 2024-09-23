import { isDevelopment } from "@/config";

export function getDefaultUsername() {
  return isDevelopment() ? "dev_user" : "";
}

export function getDefaultPwd() {
  return isDevelopment() ? "password" : "";
}

export function isType<ObjectType>(
  obj: unknown,
  validateType: (obj: ObjectType) => boolean
): obj is ObjectType {
  if (obj == null || typeof obj !== "object") {
    return false;
  }

  const castObj = obj as ObjectType;
  return validateType(castObj);
}
