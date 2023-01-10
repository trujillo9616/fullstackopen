/* eslint-disable node/no-unpublished-import */
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Post from "../models/post";
import User from "../models/user";
import { mockUser } from "./mock";
import * as argon2 from "argon2";

// interface PostTypeWithId extends PostType {
//   id: string;
// }

const api = supertest(app);

// const initialPosts = [
//   {
//     title: "Go To Statement Considered Harmful",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//   },
//   {
//     title: "Canonical string reduction",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//   },
//   {
//     title: "First class tests",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//   },
// ];

let token: string;

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await argon2.hash(mockUser.password);
  const user = new User({ username: mockUser.username, name: mockUser.name, passwordHash });
  await user.save();
  const loggedUser = await api.post('/api/login').send(mockUser);
  token = loggedUser.body.token;
});

beforeEach(async () => {
  await Post.deleteMany({});
});

describe('starts with no posts', () => {
  test('posts are returned as json', async () => {
    await api.get('/api/posts').expect(200).expect('Content-Type', /application\/json/);
  });

  test('no posts are returned', async () => {
    const response = await api.get('/api/posts');
    expect(response.body).toHaveLength(0);
  });
});

describe('adding a post', () => {
  test('a valid post can be added', async () => {
    const startPosts = await api.get('/api/posts');
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
    const endPosts = await api.get('/api/posts');
    expect(endPosts.body).toHaveLength(startPosts.body.length + 1);
    const titles = endPosts.body.map((p: { title: string }) => p.title);
    expect(titles).toContain('TDD harms architecture');
    const post = endPosts.body[endPosts.body.length - 1];
    expect(post.id).toBeDefined();
    expect(post.title).toBeDefined();
    expect(post.author).toBeDefined();
    expect(post.url).toBeDefined();
    expect(post.likes).toBeDefined();
    await api.get(`/api/posts/${post.id}`).expect(200).expect('Content-Type', /application\/json/);
  });

  test('a post without likes is added with 0 likes', async () => {
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    const response = await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
    expect(response.body.likes).toBe(0);
  });

  test('a post without title is not added', async () => {
    const newPost = {
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(400);
  });

  test('a post without url is not added', async () => {
    const newPost = {
      title: "TDD harms architecture",
    };
    await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(400);
  });

  test('a post without token is not added', async () => {
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    await api.post('/api/posts').send(newPost).expect(401);
  });

  test('a post with invalid token is not added', async () => {
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}123`).expect(401);
  });
});

describe('deleting a post', () => {
  test('a specific post can be deleted', async () => {
    const startPosts = await api.get('/api/posts');
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    const response = await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
    const post = response.body;
    await api.delete(`/api/posts/${post.id}`).set('Authorization', `bearer ${token}`).expect(204);
    const endPosts = await api.get('/api/posts');
    expect(endPosts.body).toHaveLength(startPosts.body.length);
  });

  test('a post without token is not deleted', async () => {
    const startPosts = await api.get('/api/posts');
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    const response = await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
    const post = response.body;
    await api.delete(`/api/posts/${post.id}`).expect(401);
    const endPosts = await api.get('/api/posts');
    expect(endPosts.body).toHaveLength(startPosts.body.length + 1);
  });

  test('a post with invalid token is not deleted', async () => {
    const startPosts = await api.get('/api/posts');
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    const response = await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
    const post = response.body;
    await api.delete(`/api/posts/${post.id}`).set('Authorization', `bearer ${token}123`).expect(401);
    const endPosts = await api.get('/api/posts');
    expect(endPosts.body).toHaveLength(startPosts.body.length + 1);
  });

  test('after deleting a post, it cannot be found', async () => {
    const startPosts = await api.get('/api/posts');
    const newPost = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    };
    const response = await api.post('/api/posts').send(newPost).set('Authorization', `bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
    const post = response.body;
    await api.delete(`/api/posts/${post.id}`).set('Authorization', `bearer ${token}`).expect(204);
    const endPosts = await api.get('/api/posts');
    expect(endPosts.body).toHaveLength(startPosts.body.length);
    await api.get(`/api/posts/${post.id}`).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
