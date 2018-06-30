const supertest = require('supertest');
const {
  server,
  app,
} = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const {
  blogsInDB,
  initialBlogs,
  loginUsing,
} = require('./test_helper');

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

  test('assert that adding a blog is possible', async () => {
    const token = await loginUsing(api);

    const blogsBefore = await blogsInDB();
    const newBlog = {
      title: 'My blog',
      author: 'Anders Nylund',
      url: 'http://localhost:3000',
      likes: 10000,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogsAfter = await blogsInDB();

    expect(blogsAfter.map(b => b.author)).toContain('Anders Nylund');
    expect(blogsAfter.length).toBe(blogsBefore.length + 1);
  });

  test('assert that giving no value for likes of new blog defaults to 0', async () => {
    const token = await loginUsing(api);
    const newBlog = {
      title: 'No likes',
      author: 'Anders Nylund',
      url: 'http://localhost:3000',
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201);

    expect(result.body.likes).toEqual(0);

  });

  test('assert that posting with no title returns 400', async () => {
    const token = await loginUsing(api);
    const newBlog = {
      author: 'Anders Nylund',
      url: 'http://localhost:3000',
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    expect(result.body.error).toEqual('Title or url not specified');

  });

  test('assert that posting with no url returns 400', async () => {
    const token = await loginUsing(api);
    const newBlog = {
      author: 'Anders Nylund',
      title: 'no url',
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    expect(result.body.error).toEqual('Title or url not specified');
  });

  test('assert that deleting a blog is possible', async () => {
    const token = await loginUsing(api);

    const blog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send({
        author: 'Anders',
        url: '',
        title: '',
      })
      .expect(201);

    const blogsBefore = await blogsInDB();

    await api
      .delete(`/api/blogs/${blog.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const blogsAfter = await blogsInDB();

    expect(blogsAfter).not.toContain(blogsBefore[0]);
    expect(blogsAfter.length).toBe(blogsBefore.length - 1);
  });

  test('assert that deleting someone else blog is not possible', async () => {
    const token = await loginUsing(api);
    const blogsBefore = await blogsInDB();

    await api
      .delete(`/api/blogs/${blogsBefore[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(403);

    const blogsAfter = await blogsInDB();

    expect(blogsAfter.length).toBe(blogsBefore.length);
  });

  test('assert that deleting with malformed id returns 400', async () => {
    const token = await loginUsing(api);

    await api.delete('/api/blogs/1')
      .set('Authorization', `bearer ${token}`)
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

    expect(JSON.stringify(Blog.format(result.body)))
      .toEqual(JSON.stringify(modifiedBlog));

    const blogAfter = (await blogsInDB())[0];

    expect(blogAfter).toMatchObject(modifiedBlog);
  });

  test('assert that updating blog with valid but non existing id returns 404', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    };

    const id = '5b2a8be6326da83db9b3e62d';
    await api.put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(404);
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