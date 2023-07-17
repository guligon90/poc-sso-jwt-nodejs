const loginControllers = require('./login');
const sessionControllers = require('./session');
const tokenControllers = require('./token');

const controllers = {
  ...loginControllers,
  ...sessionControllers,
  ...tokenControllers
};

module.exports = controllers;
