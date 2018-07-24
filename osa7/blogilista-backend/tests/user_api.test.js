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

describe('testing user api', () => {
  describe('when having no initial users', async () => {

    beforeEach(async () => {
      await User.remove({});
    });

    test('assert that saving user is possible', async () => {

      const newUser = {
        username: 'user',
        password: 'password',
        adult: true,
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(result.body).toHaveProperty('id');
      expect(result.body.username).toEqual('user');
      expect(result.body.adult).toEqual(true);
      expect(result.body).not.toHaveProperty('password');

      const savedUsers = await usersInDB();

      expect(savedUsers.length).toBe(1);
    });

    test('assert that saving user without username fails', async () => {
      const newUser = {
        password: 'password',
        adult: true,
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
    });

    test('assert that saving user without password fails', async () => {
      const newUser = {
        username: 'user',
        adult: true,
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400);
    });

    test('assert that saving user without \'adult\'-property defaults to true', async () => {
      const newUser = {
        username: 'username',
        password: 'password',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(200);

      expect(result.body.adult).toBe(true);
    });

  });

  describe('having initial users', async () => {

    beforeEach(async () => {
      await User.remove({});
      for (let user of initialUsers) {
        await api
          .post('/api/users')
          .send(user);
      }
    });

    test('assert that getting all users is possible', async () => {
      const usersBefore = await usersInDB();
      const result = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(usersBefore.length).toEqual(2);
      expect(usersBefore.length).toEqual(result.body.length);
    });

    test('assert that password can not be shorter than 3 characters', async () => {
      const result = await api
        .post('/api/users')
        .send({
          username: 'username',
          password: '12',
        })
        .expect(400);

      expect(result.body).toMatchObject({
        error: 'Password must be atleast 3 characters long',
      });
    });

    test('assert that the username must be unique', async () => {
      await api
        .post('/api/users')
        .send({
          username: 'user1',
          password: 'password',
          adult: true,
        })
        .expect(409)
        .expect({
          error: 'Username taken',
        });
    });

  });
});

afterAll(() => {
  server.close();
});