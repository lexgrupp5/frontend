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

export function formatDateToString(date?: Date) {
  if (date == null) { return ""; }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
