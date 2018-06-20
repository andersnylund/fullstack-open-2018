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
  if (newBlog.title === undefined || newBlog.url === undefined) {
    return res.status(400).json({ error: 'title or url not specified', });
  }

  const result = await new Blog(newBlog).save();
  return res.json(format(result));
});

blogRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch (exception) {
    console.log(exception);
    return res.status(400).json({ error: 'malformed id', });
  }
});

module.exports = blogRouter;