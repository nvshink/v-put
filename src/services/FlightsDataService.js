import http from "../http-common";

class FlightsDataService {
  getAll() {
    return http.get("/flights");
  }

  get(id) {
    return http.get(`/flights/${id}`);
  }
  unicValuesColumn(data) {
    return http.get(`/flights/search/cities?request=${data}`);
  }
  create(data) {
    return http.post("/flights", data);
  }

  update(id, data) {
    console.log(id);
    console.log(data);
    return http.put(`/flights/${id}`, data);
  }

  delete(id) {
    return http.delete(`/flights/${id}`);
  }

  deleteAll() {
    return http.delete(`/flights`);
  }
  findFlights(data) {
    return http.get(`/flights/search?date=${data.date}&startCity=${data.startCity}&endCity=${data.endCity}`);
  }
}

export default new FlightsDataService();
