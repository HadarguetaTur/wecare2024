import { httpService } from "./http.service.js";


class AuthService {
  async signUp(body) {
    const response = await httpService.post('users/signup', body);
    return response;
  }

  async signIn(body) {
    const response = await httpService.post('users/signin', body);
    return response;
  }
  async logOut(body) {
    const response = await httpService.get('users/logout', body);
    console.log(response);
    return response;
  }

  async forgotPassword(email) {
    const response = await httpService.post('users/forgot-password', { email });
    return response;
  }

  async resetPassword(token, body) {
    const response = await httpService.post(`users/reset-password/${token}`, body);
    return response;
  }
}

export const authService = new AuthService();