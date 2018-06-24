const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const userIsValid = (user) => {
  return user.username !== null && user.username !== undefined &&
    user.password !== null && user.password !== undefined;
};

const passwordIsValid = (password) => {
  return password.length >= 3;
};

const saltRounds = 10;

userRouter.get('/', async (req, res) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { author: 1, title: 1, url: 1, likes: 1, });
    return res.json(users.map(User.format));
  } catch (exception) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(exception);
    }
    return res.status(500).json({
      error: 'unexpected error',
    });
  }
});

userRouter.post('/', async (req, res) => {
  if (!userIsValid(req.body)) {
    return res.status(400).json({
      error: 'username and password must be specified',
    });
  }

  if (!passwordIsValid(req.body.password)) {
    return res.status(400).json({
      error: 'password must be atleast 3 characters long',
    });
  }

  const existingUser = await User.find({
    username: req.body.username,
  });
  if (existingUser.length > 0) {
    return res.status(409).json({
      error: 'username taken',
    });
  }

  const hashed = await bcrypt.hash(req.body.password, saltRounds);

  const newUser = {
    username: req.body.username,
    name: req.body.name,
    password: hashed,
    adult: !req.body.adult ? true : req.body.adult,
  };

  try {
    const savedUser = await new User(newUser).save({
      new: true,
    });
    return res.json(User.format(savedUser));
  } catch (exception) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(exception);
    }
    return res.status(500).json({
      error: 'unexpected error',
    });
  }
});

module.exports = userRouter;