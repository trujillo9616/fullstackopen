export interface Note {
  id?: string;
  content: string;
}

export interface NoteService {
  create: (note: Note) => Promise<Note>;
  update: (id: string, note: Note) => Promise<Note>;
}

export interface Person {
  id?: string;
  name: string;
  number: string;
}

export interface PersonService {
  create: (person: Person) => Promise<Person>;
  update: (id: string, person: Person) => Promise<Person>;
}

export interface NoteHook {
  notes: Note[];
  service: NoteService;
}

export interface FieldHook {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export interface ResourceService<T> {
  create: (resource: T) => Promise<void>;
  update: (id: string, resource: T) => Promise<void>;
}

export interface ResourceHook<T> {
  resources: T[];
  service: ResourceService<T>;
}