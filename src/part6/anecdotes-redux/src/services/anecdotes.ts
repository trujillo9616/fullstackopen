import axios from 'axios';
import { Anecdote } from '../features/anecdotes/anecdotesSlice';

const baseUrl = 'http://localhost:3003/anecdotes';

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNew = async (content: string) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
}

export const update = async (id: string, newObject: Anecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
}

const services = { getAll, createNew, update };

export default services;
