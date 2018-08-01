const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');

mongoose.connect(config.mongoUrl);
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.logger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.error);

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

server.on('close', () => {
  mongoose.connection.close();
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason, 'stack:', reason.stack);
});

module.exports = {
  app,
  server,
};