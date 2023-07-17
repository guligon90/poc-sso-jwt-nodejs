const notFoundExceptionMiddleware = (req, res, next) => {
  // catch 404 and forward to error handler
  const err = new Error('Resource Not Found');

  err.status = 404;

  next(err);
};

const exceptionMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error(err);
  
  let message = err.message || 'Internal Server Error';

  if (statusCode === 500) {
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({ message });
};

const middlewares = {
  exceptionMiddleware,
  notFoundExceptionMiddleware
};

module.exports = middlewares;
