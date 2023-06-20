const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const session = require('express-session');
const router = require('./router');

const app = express();

const {
  exceptionMiddleware,
  homeRendererMiddleware,
  notFoundExceptionMiddleware
} = require('./middlewares');

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.engine('ejs', engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use('/sso', router);
app.get('/', homeRendererMiddleware);
app.use(notFoundExceptionMiddleware);
app.use(exceptionMiddleware);

module.exports = app;
