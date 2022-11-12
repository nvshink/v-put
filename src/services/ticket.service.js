import http from "../http-common";

class TicketService {
  getAll() {
    return http.get("/tickets");
  }
  get(id) {
    return http.get(`/ticket/${id}`);
  }
  getForUser(userId) {
    console.log(userId);
    return http.get(`/tickets/${userId}`);
  }
  create(data) {
    return http.post("/tickets", data);
  }
}
export default new TicketService();
