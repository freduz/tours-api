const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');

dotenv.config({ path: './.config.env' });

require('./db')();

const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestedAuther = 'Fredy Daniel';
  req.requestedTime = new Date().toISOString();

  next();
});

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

module.exports = app;
