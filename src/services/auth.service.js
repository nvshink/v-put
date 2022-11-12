import http from "../http-common";

class AuthService {
  login(user) {
      return http.post('auth/signin', user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return http.post('auth/signup', user);
  }
}

export default new AuthService();