import { PostType } from "../../models/post";

const mockUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'testPassword12241&$#$',
}

const listWithOnePost: PostType[] = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 5,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
];

const listWithMultiplePosts: PostType[] = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 5,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
];

const listWithMultiplePostsSameNumber: PostType[] = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 5,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 7,
    user: {
      username: "test",
      name: "test",
      posts: [],
    },
  },
];

export { mockUser, listWithOnePost, listWithMultiplePosts, listWithMultiplePostsSameNumber };