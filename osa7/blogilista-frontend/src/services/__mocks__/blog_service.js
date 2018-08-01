const blogs = [
  {
    id: '5b405feacb3e2f8537893222',
    title: 'asdf',
    author: 'asdf',
    url: 'asdf',
    likes: 1,
    user: {
      _id: '5b405fbbcb3e2f8537893220',
      username: 'user1',
      name: 'User 1',
      adult: true,
    },
  },
  {
    id: '5b4066b7cb3e2f8537893226',
    title: 'dfgh',
    author: 'dfgh',
    url: 'dfgh',
    likes: 0,
    user: {
      _id: '5b405fbbcb3e2f8537893220',
      username: 'user1',
      name: 'User 1',
      adult: true,
    },
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, blogs, };
