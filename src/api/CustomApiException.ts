export class CustomApiException extends Error {
  
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "CustomApiException";
  }
}
