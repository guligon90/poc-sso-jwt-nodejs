const loginControllers = require("./login");
const tokenControllers = require("./token");

const controllers = {
  ...loginControllers,
  ...tokenControllers,
}

module.exports = controllers;
