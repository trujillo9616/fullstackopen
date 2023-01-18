import { useState, useEffect } from 'react';
import axios from 'axios';
import { FieldHook, ResourceHook } from '../types';

export const useField = (type: string, name: string): FieldHook => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const reset = () => {
    setValue('');
  }

  return {
    type,
    name,
    value,
    onChange,
    reset
  }
}

export const useResource = <T extends { id?: string }>(baseUrl: string): ResourceHook<T> => {
  const [resources, setResources] = useState<T[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    }
    fetchResources();
  }, [baseUrl]);

  const create = async (resource: T) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
  }

  const update = async (id: string, resource: T) => {
    const response = await axios.put(`${baseUrl}/${id}`, resource);
    setResources(resources.map(r => r.id === id ? response.data : r));
  }

  const service = {
    create,
    update
  }

  return {
    resources,
    service
  }
}