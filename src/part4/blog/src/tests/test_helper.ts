import Post from "../models/post";

export const initialPosts = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
];

export const nonExistingId = async () => {
  const post = new Post({ title: "willremovethissoon", url: "http://willremovethissoon.com", author: "willremovethissoon" });
  await post.save();
  await post.remove();

  return post._id.toString();
};

export const postsInDb = async () => {
  const posts = await Post.find({});
  return posts.map((p) => p.toJSON());
};

export default {
  initialPosts,
  nonExistingId,
  postsInDb,
};
