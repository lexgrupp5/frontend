const msg = "Your session have expired please log in again";

export class RefreshTokenExpiredException extends Error {
  
  constructor() {
    super(msg);
    this.message = msg;
    this.name = "RefreshTokenExpiredException";
  }
}
