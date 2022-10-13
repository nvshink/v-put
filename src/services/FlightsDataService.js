import http from "../http-common";

class FlightsDataService {
  getAll() {
    return http.get("/flights");
  }

  get(id) {
    return http.get(`/flights/${id}`);
  }

  create(data) {
    return http.post("/flights", data);
  }

  update(id, data) {
    return http.put(`/flights/${id}`, data);
  }

  delete(id) {
    return http.delete(`/flights/${id}`);
  }

  deleteAll() {
    return http.delete(`/flights`);
  }

  findByTitle(title) {
    return http.get(`/flights?title=${title}`);
  }
}

export default new FlightsDataService();
