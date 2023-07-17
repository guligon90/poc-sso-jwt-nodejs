const homeRendererMiddleware = (req, res, next) => {
	const { user } = req.session;

	const label = user === undefined ? 'unlogged' : user;

	res.render('index', {
		what: `SSO-Server ${label}`,
		title: 'SSO-Server | Home'
	});
};

const middlewares = {
	homeRendererMiddleware,
};

module.exports = middlewares;
