const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
const { render } = require('prettyjson');
const session = require('express-session');

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
  console.log('SSO service session', render({...req.session}));
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

console.log(path.join(__dirname, 'node_modules'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/sso', router);
app.get('/', homeRendererMiddleware);

app.use(exceptionMiddleware);
app.use(notFoundExceptionMiddleware);

module.exports = app;
