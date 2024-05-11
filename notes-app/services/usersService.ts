import axios from 'axios';
import { Platform } from 'react-native';
import { UserType } from '../utils/interfaces';

const ANDROID_URL = 'http://192.168.1.70:5000/api';
const WEB_URL = 'http://localhost:5000/api';

const URL = Platform.OS === 'android' ? ANDROID_URL : WEB_URL;

export default {
  async register(username: string, password: string) {
    const response = await axios.post(`${URL}/register`, {
      username,
      password,
    });
    return response.data;
  },
  async login(username: string, password: string) {
    const response = await axios.post(`${URL}/login`, {
      username,
      password,
    });
    return response.data;
  },
  async logout() {
    const response = await axios.post(`${URL}/logout`);
    return response.data;
  },
  async updateUsername(user: UserType, newUsername: string) {
    const response = await axios.put(`${URL}/users/${user.id}`, {
      username: newUsername,
    });
    return response.data;
  },
};
