const path = require('path');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const { render } = require('prettyjson');

const {
  checkSSORedirect,
  exceptionMiddleware,
  isAuthenticated,
  notFoundExceptionMiddleware
} = require('./middlewares');

const app = express();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  console.log('Consumer service session', render({...req.session}));
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'views'));

// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(checkSSORedirect());

app.get('/', isAuthenticated, (req, res, next) => {
  res.render('index', {
    name: process.app.hostname,
    what: req.session.user,
  });
});

app.use(exceptionMiddleware);
app.use(notFoundExceptionMiddleware);

module.exports = app;
