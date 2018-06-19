const blogRouter = require('express').Router();
const Blog = require('../models/blog');

const format = (blog) => ({
  id: blog._id,
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes,
});

blogRouter.post('/', async (req, res) => {
  const newBlog = await new Blog(req.body).save();
  return res.json(format(newBlog));
});

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(blog => res.json(format(blog)));
});

module.exports = blogRouter;