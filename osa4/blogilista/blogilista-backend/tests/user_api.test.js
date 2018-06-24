const supertest = require('supertest');
const {
  server,
  app,
} = require('../index');
const api = supertest(app);
const User = require('../models/user');
const {
  initialUsers,
  usersInDB,
} = require('./test_helper');

describe('having no any initial users', async () => {

  beforeEach(async () => {
    await User.remove({});
  });

  test('assert that saving user is possible', async () => {

    const newUser = {
      username: 'user',
      password: 'password',
      authorative: true,
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toHaveProperty('id');
    expect(result.body.username).toEqual('user');
    expect(result.body.authorative).toEqual(true);
    expect(result.body).not.toHaveProperty('password');

    const savedUsers = await usersInDB();

    expect(savedUsers.length).toBe(1);
  });

  test('assert that saving user without username fails', async () => {
    const newUser = {
      password: 'password',
      authorative: true,
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('assert that saving user without password fails', async () => {
    const newUser = {
      username: 'user',
      authorative: true,
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('assert that saving user without authorative defaults to false', async () => {
    const newUser = {
      username: 'user',
      password: 'password',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200);

    expect(result.body.authorative).toBe(false);
  });

  afterAll(() => {
    server.close();
  });

});

describe('having initial users', async () => {

  beforeEach(async () => {
    await User.remove({});
    const userPromises = initialUsers.map(u => new User(u).save());
    await Promise.all(userPromises);
  });

  test('assert that getting all users is possible', async () => {
    const usersBefore = await usersInDB();
    const result = await api
      .get('/api/users')
      .expect(200)
      .expect(/application\/json/);

    expect(usersBefore.length).toEqual(result.body.length);
  });

  afterAll(() => {
    server.close();
  });

});