import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { generateId } from './utils';
import { Person } from './types';

dotenv.config();

const PORT = process.env.PORT || 3001;

let db: Person[] = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  }
];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('build'));
app.use(cors());
morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Get Routes
app.get('/api', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/info', (_req: Request, res: Response) => {
  const date = new Date();
  const info = `Phonebook has info for ${db.length} people\n
  ${date}`;
  res.send(info);
})

app.get('/api/persons', (_req: Request, res: Response) => {
  res.json(db);
});

app.get('/api/persons/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const person = db.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Delete Routes
app.delete('/api/persons/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  db = db.filter(p => p.id !== id);
  res.status(204).end();
});

// Post Routes
app.post('/api/persons', (req: Request, res: Response) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  if (db.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    id: generateId(db),
    name: body.name,
    number: body.number
  }

  db = db.concat(person);

  return res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
