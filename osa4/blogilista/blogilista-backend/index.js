const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');
const config = require('./utils/config');

mongoose.connect(config.mongoUrl);
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.logger);
app.use('/api/blogs', blogRouter);
app.use(middleware.error);

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

server.on('close', async () => {
  await mongoose.connection.close();
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason, 'stack:', reason.stack);
});

module.exports = {
  app,
  server,
};