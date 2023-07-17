const exceptionMiddlewares = require('./exception');
const homeMiddlewares = require('./home');

const middlewares = {
  ...exceptionMiddlewares,
  ...homeMiddlewares,
};

module.exports = middlewares;
