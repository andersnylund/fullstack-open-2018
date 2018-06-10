const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.logger);
app.use('/api/blogs', blogRouter);
app.use(middleware.error);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
