const Blog = require('../models/blog');
const User = require('../models/user');


const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const initialUsers = [
  {
    username: 'user1',
    name: 'User Number1',
    password: 'password1',
    adult: false,
  },
  {
    username: 'user2',
    name: 'User Number2',
    password: 'password2',
    adult: true,
  },
];


const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(Blog.format);
};


const usersInDB = async () => {
  const users = await User.find({});
  return users.map(User.format);
};

/**
 * @returns a valid jwt-token
 * @param {*} api the api use when creating the user
 */
const loginAsUser1 = async (api) => {
  await User.remove({});

  await api
    .post('/api/users')
    .send({
      username: 'user1',
      name: 'User 1',
      password: 'password1',
      adult: true,
    });

  await api
    .post('/api/users')
    .send({
      username: 'user2',
      name: 'User 2',
      password: 'password2',
      adult: true,
    });

  return (await api
    .post('/api/login')
    .send({
      username: 'user1',
      password: 'password1',
    })).body.token;
};


module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDB,
  usersInDB,
  loginAsUser1,
};