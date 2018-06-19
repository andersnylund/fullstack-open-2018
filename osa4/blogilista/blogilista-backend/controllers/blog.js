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

  const newBlog = req.body;
  if (newBlog.likes === undefined) {
    newBlog.likes = 0;
  }

  const result = await new Blog(newBlog).save();
  res.json(format(result));
});

module.exports = blogRouter;