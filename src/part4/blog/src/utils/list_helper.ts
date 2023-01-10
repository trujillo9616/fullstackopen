import { PostType } from '../models/post';

type AuthorPosts = { author: string, posts: number };
type AuthorLikes = { author: string, likes: number };

const totalLikes = (posts: PostType[]): number => {
  return posts.reduce((sum, post) => sum + post.likes, 0);
};

const favoritePost = (posts: PostType[]): PostType | null => {
  if (posts.length === 0) {
    return null;
  }
  return posts.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
};

const mostPosts = (posts: PostType[]): AuthorPosts[] | null => {
  if (posts.length === 0) {
    return null;
  }
  const uniqueAuthors = [...new Set(posts.map(post => post.author))];
  const authorPosts = uniqueAuthors.map(author => {
    return {
      author,
      posts: posts.filter(post => post.author === author).length
    }
  });

  const mostPosts: AuthorPosts[] = [];
  authorPosts.forEach(authorPost => {
    if (mostPosts.length === 0) {
      mostPosts.push(authorPost);
    } else if (authorPost.posts > mostPosts[0].posts) {
      mostPosts.splice(0, 1, authorPost);
    } else if (authorPost.posts === mostPosts[0].posts) {
      mostPosts.push(authorPost);
    }
  }
  );
  return mostPosts;
};

const mostLikes = (posts: PostType[]): AuthorLikes[] | null => {
  if (posts.length === 0) {
    return null;
  }
  const uniqueAuthors = [...new Set(posts.map(post => post.author))];
  const authorLikes = uniqueAuthors.map(author => {
    return {
      author,
      likes: posts.filter(post => post.author === author).reduce((sum, post) => sum + post.likes, 0)
    }
  });

  const mostLikes: AuthorLikes[] = [];
  authorLikes.forEach(authorLike => {
    if (mostLikes.length === 0) {
      mostLikes.push(authorLike);
    } else if (authorLike.likes > mostLikes[0].likes) {
      mostLikes.splice(0, 1, authorLike);
    } else if (authorLike.likes === mostLikes[0].likes) {
      mostLikes.push(authorLike);
    }
  });
  return mostLikes;
};

export default {
  totalLikes,
  favoritePost,
  mostPosts,
  mostLikes
};
