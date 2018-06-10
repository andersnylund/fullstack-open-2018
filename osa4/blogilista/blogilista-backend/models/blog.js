const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_PATH}`;
mongoose.connect(mongoUrl);

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number,
});

module.exports = Blog;