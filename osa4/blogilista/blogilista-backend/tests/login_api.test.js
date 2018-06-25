const supertest = require('supertest');
const {
  server,
  app,
} = require('../index');
const User = require('../models/user');
const api = supertest(app);

describe('test login api', () => {

  beforeEach(async () => {
    //await User.remove({});
  });

  describe('when having no initial users', () => {
    test('assert that creating a new user is possible', async () => {
      // TODO
    });
  });

  afterAll(() => {
    server.close();
  });

});