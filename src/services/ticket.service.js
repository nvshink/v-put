import http from "../http-common";

class TicketService {
  getAll() {
    return http.get("/tickets");
  }
  get(id) {
    return http.get(`/ticket/${id}`);
  }
  getForUser(userId) {
    return http.get(`/tickets/${userId}`);
  }
  create(data) {
    return http.post("/tickets", data);
  }
  print(ticketId) {
    return http.post(`/ticket/print/${ticketId}`, {responseType: 'blob'});
  }
  fetch(ticketId) {
    return http.get(`/ticket/fetch/${ticketId}`, {responseType: 'blob'});
  }
}
export default new TicketService();
