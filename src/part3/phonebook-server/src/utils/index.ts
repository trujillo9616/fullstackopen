import { Person } from '../types';

const generateId = (db: Person[]) => {
  const maxId = db.length > 0
    ? Math.max(...db.map(p => p.id))
    : 0;
  return maxId + 1;
}

export {
  generateId
}
