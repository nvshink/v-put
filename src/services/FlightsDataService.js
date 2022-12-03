import http from "../http-common";
import authHeader from './auth-header';

class FlightsDataService {
  getAll() {
    return http.get("/flights");
  }
  getSome(data) {
    return http.get(`/flights/some/$`, data);
  }
  get(id) {
    return http.get(`/flights/${id}`);
  }
  unicValuesColumn(data) {
    return http.get(`/flights/search/cities?request=${data}`);
  }
  create(data) {
    return http.post("/flights", data,  { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/flights/update?id=${id}&place=${data.place}`,  { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/flights/${id}`,  { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/flights`,  { headers: authHeader() });
  }
  findFlights(data) {
    return http.get(`/flights/search?date=${data.date}&startCity=${data.startCity}&endCity=${data.endCity}`);
  }
}

export default new FlightsDataService();
