/* eslint-disable node/no-unpublished-import */
import * as argon2 from 'argon2';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import User from '../models/user';
import { mockUser } from './mock';

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await argon2.hash(mockUser.password);
  const user = new User({ username: mockUser.username, name: mockUser.name, passwordHash });
  await user.save();
});

describe('login', () => {
  test('succeeds with correct credentials', async () => {
    const response = await api.post('/api/login').send(mockUser).expect(200);
    expect(response.body.token).toBeDefined();
  });

  test('fails with the wrong password', async () => {
    const wrongPasswordUser = { ...mockUser, password: 'wrongPassword' };
    await api.post('/api/login').send(wrongPasswordUser).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
