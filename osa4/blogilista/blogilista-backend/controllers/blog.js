const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const blogIsValid = (blog) => {
  return blog.title !== null && blog.title !== undefined &&
    blog.url !== null && blog.url !== undefined;
};


blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1,
      adult: 1,
    });
  return res.json(blogs.map(Blog.format));
});

blogRouter.post('/', async (req, res) => {
  const newBlog = req.body;
  try {

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({
        error: 'token missing or invalid',
      });
    }

    if (newBlog.likes === undefined || newBlog.likes === null) {
      newBlog.likes = 0;
    }
    if (!blogIsValid(newBlog)) {
      return res.status(400).json({
        error: 'title or url not specified',
      });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(400).json({ error: 'user does not exist', });
    }
    newBlog.user = user._id;
    const result = await new Blog(newBlog).save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    return res.status(201).json(Blog.format(result));

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      res.status(401).json({
        error: exception.message,
      });
    } else {
      console.log(exception);
      res.status(500).json({
        error: 'Interal server error',
      });
    }
  }
});


blogRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch (exception) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(exception);
    }
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
    if (result) {
      return res.json(result);
    } else {
      return res.status(404).json({
        error: 'not found',
      });
    }
  } catch (exception) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(exception);
    }
    return res.status(400).json({
      error: 'malformed id',
    });
  }
});


module.exports = blogRouter;