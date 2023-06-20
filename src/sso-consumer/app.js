const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const session = require('express-session');

const app = express();

const {
  checkSSORedirect,
  exceptionMiddleware,
  isAuthenticated,
  notFoundExceptionMiddleware
} = require('./middlewares');

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.engine('ejs', engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(checkSSORedirect());

app.get('/', isAuthenticated, (req, res, next) => {
  res.render('index', {
    what: `SSO-Consumer One ${JSON.stringify(req.session.user)}`,
    title: 'SSO-Consumer | Home'
  });
});

app.use(notFoundExceptionMiddleware);
app.use(exceptionMiddleware);

module.exports = app;
