import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Person from './models/person';

dotenv.config();
const PORT = process.env.PORT || 3001;

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  return next(error);
};

// Connect to MongoDB
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/phonebook';
mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('build'));
app.use(cors());
morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// Routes
app.get('/api', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/info', async (_req: Request, res: Response) => {
  const db = await Person.find({});
  const date = new Date();
  const info = `Phonebook has info for ${db.length} people\n
  ${date}`;
  res.send(info);
})

app.get('/api/persons', async (_req: Request, res: Response) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.get('/api/persons/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (req: Request, res: Response) => {
  try {
    await Person.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).send({ error: 'malformatted id' });
  }
});

app.post('/api/persons', async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const persons = await Person.find({});
  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  const savedPerson = await person.save();

  return res.json(savedPerson);
});

app.put('/api/persons/:id', async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, person, { new: true });
    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
