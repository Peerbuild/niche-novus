export class ActionResponse {
  status: "success" | "error";
  message?: string;

  constructor(status: "success" | "error", message?: string) {
    this.status = status;
    this.message = message;
  }

  json() {
    return JSON.parse(JSON.stringify(this));
  }
}
