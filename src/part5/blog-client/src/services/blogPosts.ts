import axios from 'axios';
const baseUrl = '/api/posts';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
}

const get = async (id: string) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
}

const create = async (newPost: { title: string, url: string }) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newPost, config);
  return response.data;
}

const update = async (id: string, newPost: { title: string, url: string, likes: number }) => {
  const response = await axios.put(`${baseUrl}/${id}`, newPost);
  return response.data;
}

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
}

const services = {
  getAll,
  get,
  setToken,
  create,
  update,
  remove,
}
export default services;
