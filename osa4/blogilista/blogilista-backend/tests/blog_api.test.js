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

describe('when having initial blogs', () => {
  test('test if get all returns valid json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(testBlogs.length);
  });

  test('test if get all returns first elemement correct', async () => {
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

  test('test if adding a blog is possible', async () => {
    const newBlog = {
      title: 'My blog',
      author: 'Anders Nylund',
      url: 'http://localhost:3000',
      likes: 10000,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200);

    const responseAfterSave = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(responseAfterSave.body.map(b => b.author)).toContain('Anders Nylund');
    expect(responseAfterSave.body.length).toBe(testBlogs.length + 1);
  });
});

test('test if giving no value for likes of new blog defaults to 0', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'Anders Nylund',
    url: 'http://localhost:3000',
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200);

  expect(result.body.likes).toEqual(0);

});

test('assert that posting no title returns 400', async () => {
  const newBlog = {
    author: 'Anders Nylund',
    url: 'http://localhost:3000',
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  expect(result.body.error).toEqual('title or url not specified');

});

test('assert that no url returns 400', async () => {
  const newBlog = {
    author: 'Anders Nylund',
    title: 'no url',
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  expect(result.body.error).toEqual('title or url not specified');
});


afterAll(() => {
  server.close();
});