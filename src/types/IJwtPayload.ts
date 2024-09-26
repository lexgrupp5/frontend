import { RoleType } from "@/constants";
import { JwtPayload } from "jwt-decode";

export interface IJwtPayload extends JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: RoleType[];
}
