const blogRouter = require('express').Router();
const Blog = require('../models/blog');

const format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  };
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs.map(format));
});

blogRouter.post('/', async (req, res) => {
  const blog = await new Blog(req.body).save();
  res.json(format(blog));
});

module.exports = blogRouter;