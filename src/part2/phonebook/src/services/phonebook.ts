import axios from 'axios';
import { Person } from '../types';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (newPerson: Person) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
}

const update = async (id: number, newPerson: Person) => {
  const response = await axios.put(`${baseUrl}/${id}`, newPerson);
  return response.data;
}

const remove = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

const phonebookService = {
  getAll,
  create,
  update,
  remove
}

export default phonebookService;