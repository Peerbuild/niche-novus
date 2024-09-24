export class ActionResponse {
  status: "success" | "error";

  constructor(status: "success" | "error") {
    this.status = status;
  }

  json() {
    return JSON.parse(JSON.stringify(this));
  }
}
