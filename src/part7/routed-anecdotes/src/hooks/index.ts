import { useState } from 'react';

export const useField = (type: string, name: string) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    name,
    value,
    onChange,
    reset
  };
}

