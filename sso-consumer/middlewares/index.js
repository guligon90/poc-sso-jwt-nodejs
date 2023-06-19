const redirectMiddlewares = require("./redirect");
const authenticatedMiddlewares = require("./authentication");
const exceptionMiddlewares = require("./exception");

const middlewares = {
    ...authenticatedMiddlewares,
    ...exceptionMiddlewares,
    ...redirectMiddlewares,
};

module.exports = middlewares;
