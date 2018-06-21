const supertest = require('supertest');
const {
  server,
  app,
} = require('../index');
const api = supertest(app);
const {
  blogsInDB,
  initialBlogs,
  format,
} = require('./test_helper');
const Blog = require('../models/blog');

describe('when having initial blogs', () => {

  beforeEach(async () => {
    try {
      await Blog.remove({});
      for (let blog of initialBlogs) {
        let newBlog = new Blog(blog);
        await newBlog.save();
      }
    } catch (exception) {
      console.log(exception);
    }
  });

  test('test if get all returns valid json', async () => {
    const blogsInDatabase = await blogsInDB();

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(blogsInDatabase.length);
  });

  test('test if get all returns first elemement correct', async () => {
    const response = await api
      .get('/api/blogs');

    expect(response.body[0]).toMatchObject({
      author: 'Michael Chan',
      likes: 7,
      title: 'React patterns',
      url: 'https://reactpatterns.com/',
    });
  });

  test('test if adding a blog is possible', async () => {
    const blogsBefore = await blogsInDB();

    const newBlog = {
      title: 'My blog',
      author: 'Anders Nylund',
      url: 'http://localhost:3000',
      likes: 10000,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const blogsAfter = await blogsInDB();

    expect(blogsAfter.map(b => b.author)).toContain('Anders Nylund');
    expect(blogsAfter.length).toBe(blogsBefore.length + 1);
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
      .expect(201);

    expect(result.body.likes).toEqual(0);

  });

  test('assert that posting with no title returns 400', async () => {
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

  test('assert that posting with no url returns 400', async () => {
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

  test('assert that deleting a blog is possible', async () => {
    const blogsBefore = await blogsInDB();

    await api
      .delete(`/api/blogs/${blogsBefore[0].id}`)
      .expect(204);

    const blogsAfter = await blogsInDB();

    expect(blogsAfter).not.toContain(blogsBefore[0]);
    expect(blogsAfter.length).toBe(blogsBefore.length - 1);
  });

  test('assert that deleting with malformed id returns 400', async () => {
    await api.delete('/api/blogs/1')
      .expect(400);
  });

  test('assert that updating a blog is possible', async () => {
    const blogBefore = (await blogsInDB())[0];

    const modifiedBlog = blogBefore;
    modifiedBlog.author = '';
    modifiedBlog.url = '';
    modifiedBlog.title = '';
    modifiedBlog.likes = 0;

    const result = await api
      .put(`/api/blogs/${blogBefore.id}`)
      .send(modifiedBlog)
      .expect(200);

    expect(JSON.stringify(format(result.body)))
      .toEqual(JSON.stringify(modifiedBlog));

    const blogAfter = (await blogsInDB())[0];

    expect(blogAfter).toMatchObject(modifiedBlog);
  });

  test('assert that updating with malformed id returns 400', async () => {
    const blogsBefore = await blogsInDB();
    await api.put('/api/blogs/1')
      .expect(400);
    const blogsAfter = await blogsInDB();
    expect(blogsBefore.length).toEqual(blogsAfter.length);
  });

  test('assert that updating with no title returns 400', async () => {
    const blogsBefore = await blogsInDB();

    const blogToUpdate = blogsBefore[0];
    delete blogToUpdate.title;

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(400);

    const blogsAfter = await blogsInDB();

    expect(blogsBefore.length).toEqual(blogsAfter.length);
  });

  test('assert that updating with no url returns 400', async () => {
    const blogsBefore = await blogsInDB();

    const blogToUpdate = blogsBefore[0];
    delete blogToUpdate.url;

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(400);

    const blogsAfter = await blogsInDB();

    expect(blogsBefore.length).toEqual(blogsAfter.length);
  });

  afterAll(() => {
    server.close();
  });
});