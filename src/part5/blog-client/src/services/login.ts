import axios from 'axios';
const baseUrl = '/api/login';

export const login = async (credentials: { username: string, password: string }) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

const services = {
  login,
}

export default services;
