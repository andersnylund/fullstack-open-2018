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

const blogIsValid = (blog) => {
  return blog.title !== null && blog.title !== undefined &&
    blog.url !== null && blog.url !== undefined;
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs.map(format));
});

blogRouter.post('/', async (req, res) => {
  const newBlog = req.body;
  if (newBlog.likes === undefined || newBlog.likes === null) {
    newBlog.likes = 0;
  }
  if (!blogIsValid(newBlog)) {
    return res.status(400).json({
      error: 'title or url not specified',
    });
  }

  const result = await new Blog(newBlog).save();
  return res.status(201).json(format(result));
});

blogRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch (exception) {
    console.log(exception);
    return res.status(400).json({
      error: 'malformed id',
    });
  }
});

blogRouter.put('/:id', async (req, res) => {

  const newBlog = Object.assign(req.body);

  if (!blogIsValid(newBlog)) {
    return res.status(400).json({
      error: 'title or url not specified',
    });
  }

  if (newBlog.likes === undefined || newBlog.likes === null) {
    newBlog.likes = 0;
  }

  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
      new: true,
    });
    return res.json(result);
  } catch (exception) {
    console.log(exception);
    return res.status(400).json({
      error: 'malformed id',
    });
  }
});

module.exports = blogRouter;