const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const userIsValid = (user) => {
  return user.username !== null && user.username !== undefined &&
    user.password !== null && user.password !== undefined;
};

const saltRounds = 10;

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users.map(User.format));
  } catch (exception) {
    return res.status(500).json({ error: 'unexpected error', });
  }
});

userRouter.post('/', async (req, res) => {
  if (!userIsValid(req.body)) {
    return res.status(400).json({ error: 'username and password must be specified', });
  }

  const hashed = await bcrypt.hash(req.body.password, saltRounds);

  const newUser = {
    username: req.body.username,
    name: req.body.name,
    password: hashed,
    authorative: !req.body.authorative ? false : true,
  };

  try {
    const savedUser = await new User(newUser).save();
    return res.json(User.format(savedUser));
  } catch (exception) {
    return res.status(500).json({ error: 'unexpected error', });
  }
});

module.exports = userRouter;