const supertest = require('supertest');
const {
  server,
  app,
} = require('../index');
const api = supertest(app);
const testBlogs = require('./test_blogs');
const Blog = require('../models/blog');

beforeAll(async () => {
  try {
    await Blog.remove({});
    for (let blog of testBlogs) {
      let newBlog = new Blog(blog);
      await newBlog.save();
    }
  } catch (exception) {
    console.log(exception);
  }
});

describe('api tests for blogs', () => {
  test('test if returns valid json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(testBlogs.length);
  });

  test('test if first elemement is correct', async () => {
    const response = await api
      .get('/api/blogs');

    expect(response.body[0]).toEqual({
      author: 'Michael Chan',
      id: '5a422a851b54a676234d17f7',
      likes: 7,
      title: 'React patterns',
      url: 'https://reactpatterns.com/',
    });
  });
});


afterAll(() => {
  server.close();
});