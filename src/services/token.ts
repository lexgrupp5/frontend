import { RoleType } from "@/constants";
import { IJwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

function getDecodedToken (token: string): IJwtPayload {
  return jwtDecode<IJwtPayload>(token);
};

export function getUserRolesFromToken (token: string): RoleType[] {
  const decoded = getDecodedToken(token);
  const roles = decoded[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
  return roles == null ? [] : roles;
};

export function isExpiredToken (token: string): boolean {
  const decoded = getDecodedToken(token);
  if (decoded.exp == null) return true;
  const expire = decoded.exp * 1000;
  const currentTimestamp = Date.now();
  return expire < currentTimestamp;
};
