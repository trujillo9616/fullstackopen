import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { generateId } from './utils';
import { Person } from './types';

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
app.use(express.static('build'));
app.use(cors());
morgan.token('body', (req: express.Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Get Routes
app.get('/api', (_req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.get('/api/info', (_req: express.Request, res: express.Response) => {
  const date = new Date();
  const info = `Phonebook has info for ${db.length} people\n
  ${date}`;
  res.send(info);
})

app.get('/api/persons', (_req: express.Request, res: express.Response) => {
  res.json(db);
});

app.get('/api/persons/:id', (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  const person = db.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Delete Routes
app.delete('/api/persons/:id', (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  db = db.filter(p => p.id !== id);
  res.status(204).end();
});

// Post Routes
app.post('/api/persons', (req: express.Request, res: express.Response) => {
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
