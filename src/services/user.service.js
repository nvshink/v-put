import authHeader from './auth-header';
import http from "../http-common";

class UserService {
  getPublicContent() {
    return http.get('test/all');
  }

  getUserBoard() {
    return http.get('test/user', { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get( 'test/admin', { headers: authHeader() });
  }
  updateFlights(id, data) {
    return http.put( `/test/${id}`, data);
  }
}

export default new UserService();