const express = require('express');
const cors = require('cors');
require('express-async-errors');
require('dotenv/config');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(process.env.PORT || 3001, () => console.log(`Server started at localhost:${process.env.PORT || 3001}`));
