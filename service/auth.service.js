import axios from '@nuxtjs/axios'
const API_URL = 'http://localhost:9090/auth/';

class AuthService {
  async login(user) {
    /*const response = await axios.post(API_URL + 'sign-in-user', {
      email: user.email,
      password: user.password
    });
    const data = await response.data;
    console.log("RESPONSE", response);
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
      console.log("Access Token", response);
    }
    return data;*/
  }

  /*logout() {
    localStorage.removeItem('user');
  }*/
}

export default new AuthService();
