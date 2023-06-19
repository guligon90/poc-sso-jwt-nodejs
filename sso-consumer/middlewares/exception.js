const exceptionMiddleware = (err, req, res, next) => {
	console.error({
		message: err.message,
		error: err
	});
	
	const statusCode = err.status || 500;
	let message = err.message || "Internal Server Error";

	if (statusCode === 500) {
		message = "Internal Server Error";
	}

	res.status(statusCode).json({ message });
};

const notFoundExceptionMiddleware = (req, res, next) => {
  // catch 404 and forward to error handler
	const err = new Error("Resource Not Found");
  
	err.status = 404;
  
	next(err);
};

const middlewares = {
	exceptionMiddleware,
	notFoundExceptionMiddleware,
}

module.exports = middlewares;
