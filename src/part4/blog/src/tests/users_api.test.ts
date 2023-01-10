/* eslint-disable node/no-unpublished-import */
import * as argon2 from 'argon2';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import User from '../models/user';
import { mockUser } from './mock';

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await argon2.hash(mockUser.password);
  const user = new User({ username: mockUser.username, name: mockUser.name, passwordHash });
  await user.save();
});

describe('there is initially one user in db', () => {
  test('users are returned as json', async () => {
    await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
  });

  test('all users are returned', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(1);
  });

  test('verify user properties', async () => {
    const response = await api.get('/api/users');
    const user = response.body[0];
    expect(user.id).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.passwordHash).toBeUndefined();
    expect(user.posts).toBeDefined();
  });
});

describe('user creation validation', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'truji',
      name: 'Adrian Trujillo',
      password: 'SuperSecretPassword12345&*&^',
    };

    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: mockUser.username,
      name: 'New User',
      password: 'SuperSecretPassword12345&*&^',
    };

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('username must be unique');
    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'ro',
      name: 'New User',
      password: 'SuperSecretPassword12345&*&^',
    };

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('is shorter than the minimum allowed length');
    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password strength is low', async () => {
    const usersAtStart = await User.find({});
    const password = 'sup';

    const newUser = {
      username: 'newuser',
      name: 'New User',
      password,
    };

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
    expect(result.body.error).toContain('password is too weak');
    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
