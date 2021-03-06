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
        error: 'Token missing or invalid',
      });
    }

    if (newBlog.likes === undefined || newBlog.likes === null) {
      newBlog.likes = 0;
    }
    if (!blogIsValid(newBlog)) {
      return res.status(400).json({
        error: 'Title or url not specified',
      });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(400).json({
        error: 'User does not exist',
      });
    }
    newBlog.user = user._id;
    const result = await new Blog(newBlog).save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    return res.status(201).json(Blog.format(result));

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: exception.message,
      });
    } else {
      console.log(exception);
      return res.status(500).json({
        error: 'Interal server error',
      });
    }
  }
});


blogRouter.delete('/:id', async (req, res) => {
  try {
    const userId = jwt.verify(req.token, process.env.SECRET).id;

    const blog = await Blog.findById(req.params.id);

    if (!blog.user) {
      await Blog.findByIdAndRemove(req.params.id);
      return res.status(204).end();
    } else if (userId === blog.user.toString()) {
      await Blog.findByIdAndRemove(req.params.id);
      return res.status(204).end();
    } else {
      return res.status(403).send({ error: 'You do not own this blog', });
    }

  } catch (exception) {
    if (process.env.NODE_ENV !== 'test') {
      console.error({ exception, });
    }
    if (exception.name === 'JsonWebTokenError') {
      return res.status(401).send({
        error: exception.message,
      });
    }
    return res.status(400).json({
      error: 'Malformed id',
    });
  }
});


blogRouter.put('/:id', async (req, res) => {

  const newBlog = Object.assign(req.body);

  if (!blogIsValid(newBlog)) {
    return res.status(400).json({
      error: 'Title or url not specified',
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
      return res.json(Blog.format(result));
    } else {
      return res.status(404).json({
        error: 'Not found',
      });
    }
  } catch (exception) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(exception);
    }
    return res.status(400).json({
      error: 'Malformed id',
    });
  }
});

blogRouter.post('/:id/comments', async (req, res) => {
  const comment = req.body.comment;
  const id = req.params.id;

  if (!comment) {
    return res.status(400).json({
      error: 'comment not specified',
    });
  }

  try {
    const oldBlog = await Blog.findById(id);
    if (!oldBlog) {
      return res.status(404).json({
        error: 'Blog not found',
      });
    }
    const newBlog = Object.assign(oldBlog);
    newBlog.comments = [ ...oldBlog.comments, comment, ];
    const result = await Blog.findByIdAndUpdate(id, newBlog, { new: true, });
    return res.json(Blog.format(result));
  } catch (exception) {
    console.log({ exception, });
    return res.status(400).json({
      error: 'Malformed id',
    });
  }
});


module.exports = blogRouter;