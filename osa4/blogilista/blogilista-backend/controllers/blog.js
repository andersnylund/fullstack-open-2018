const blogRouter = require('express').Router();
const Blog = require('../models/blog');

const format = (blog) => ({
  id: blog._id,
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes,
});

blogRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => res.json(blogs.map(format)));
});

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(blog => res.json(format(blog)));
});

module.exports = blogRouter;