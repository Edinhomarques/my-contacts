const express = require('express');
require('express-async-errors');
require('dotenv/config');

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started at localhost:3000'));
