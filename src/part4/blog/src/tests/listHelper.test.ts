import listHelper from '../utils/list_helper';
import { listWithOnePost, listWithMultiplePosts, listWithMultiplePostsSameNumber } from './mock';

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one post equal the likes of that', () => {
    const result = listHelper.totalLikes(listWithOnePost);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultiplePosts);
    expect(result).toBe(27);
  });
});


describe('favorite post', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoritePost([]);
    expect(result).toBe(null);
  });

  test('when list has only one post equal the post itself', () => {
    const result = listHelper.favoritePost(listWithOnePost);
    expect(result).toEqual(listWithOnePost[0]);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoritePost(listWithMultiplePosts);
    expect(result).toEqual(listWithMultiplePosts[1]);
  });
});

describe('most posts', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostPosts([]);
    expect(result).toBe(null);
  });

  test('when list has only one post equal the post itself', () => {
    const result = listHelper.mostPosts(listWithOnePost);
    expect(result).toEqual([{ author: 'Edsger W. Dijkstra', posts: 1 }]);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostPosts(listWithMultiplePosts);
    expect(result).toEqual([{ author: 'Edsger W. Dijkstra', posts: 2 }]);
  });

  test('of a bigger list with multiple authors is calculated right', () => {
    const result = listHelper.mostPosts(listWithMultiplePostsSameNumber);
    expect(result).toEqual([{ author: 'Edsger W. Dijkstra', posts: 2 }, { author: 'Robert C. Martin', posts: 2 }]);
  });
});

describe('most likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(null);
  });

  test('when list has only one post equal the post itself', () => {
    const result = listHelper.mostLikes(listWithOnePost);
    expect(result).toEqual([{ author: 'Edsger W. Dijkstra', likes: 5 }]);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithMultiplePosts);
    expect(result).toEqual([{ author: 'Edsger W. Dijkstra', likes: 17 }]);
  });

  test('of a bigger list with multiple authors is calculated right', () => {
    const result = listHelper.mostLikes(listWithMultiplePostsSameNumber);
    expect(result).toEqual([{ author: 'Edsger W. Dijkstra', likes: 17 }, { author: 'Robert C. Martin', likes: 17 }]);
  });
});
