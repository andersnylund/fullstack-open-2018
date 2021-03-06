const listHelper = require('../utils/list_helper');
const { initialBlogs, } = require('./test_helper');

describe('list helpers', () => {
  test('dummy is called', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  describe('total likes', () => {
    test('when list has multiple blogs', () => {
      const result = listHelper.totalLikes(initialBlogs);
      expect(result).toBe(36);
    });

    test('when list has one blog', () => {
      const result = listHelper.totalLikes([].concat(initialBlogs[0]));
      expect(result).toBe(7);
    });

    test('when list is empty', () => {
      const result = listHelper.totalLikes([]);
      expect(result).toBe(0);
    });
  });

  describe('blog with most likes', () => {
    test('when providing multiple blogs', () => {
      const result = listHelper.favoriteBlog(initialBlogs);
      const expected = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      };
      expect(result).toEqual(expected);
    });
    test('when providing one blog', () => {
      const result = listHelper.favoriteBlog([].concat(initialBlogs[0]));
      const expected = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      };
      expect(result).toEqual(expected);
    });
    test('when providing empty list', () => {
      const result = listHelper.favoriteBlog([]);
      expect(result).toBe(null);
    });
    test('when providing undefined', () => {
      const result = listHelper.favoriteBlog(undefined);
      expect(result).toBe(null);
    });
    test('when providing null', () => {
      const result = listHelper.favoriteBlog(null);
      expect(result).toBe(null);
    });
  });

  describe('author with most blogs', () => {
    test('when providing multiple blogs', () => {
      const result = listHelper.mostBlogs(initialBlogs);
      expect(result).toEqual({
        author: 'Robert C. Martin',
        blogs: 3,
      });
    });
    test('when providing one blog', () => {
      const result = listHelper.mostBlogs([].concat(initialBlogs[0]));
      expect(result).toEqual({
        author: 'Michael Chan',
        blogs: 1,
      });
    });
    test('when providing empty list', () => {
      const result = listHelper.mostBlogs([]);
      expect(result).toEqual(null);
    });
    test('when providing null', () => {
      const result = listHelper.mostBlogs(null);
      expect(result).toEqual(null);
    });
    test('when providing undefined', () => {
      const result = listHelper.mostBlogs(undefined);
      expect(result).toEqual(null);
    });
  });

  describe('author with most likes combined', () => {
    test('when providing multiple blogs', () => {
      const result = listHelper.mostLikes(initialBlogs);
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17,
      });
    });
    test('when providing one blog', () => {
      const result = listHelper.mostLikes([].concat(initialBlogs[0]));
      expect(result).toEqual({
        author: 'Michael Chan',
        likes: 7,
      });
    });
    test('when providing empty list', () => {
      const result = listHelper.mostLikes([]);
      expect(result).toBe(null);
    });
    test('when providing null', () => {
      const result = listHelper.mostLikes(null);
      expect(result).toBe(null);
    });
    test('when providing undefined', () => {
      const result = listHelper.mostLikes(undefined);
      expect(result).toBe(null);
    });
  });
});