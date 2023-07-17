const {
	sessionApp,
	ssoTokenCache,
  sessionUser,
} = require('../data');

const renderSessionsPage = (req, res, next) => {
  return res.render('sessions', {
		title: 'SSO-Server | Sessions',
		userSessions: sessionUser,
		appSessions: sessionApp,
		ssoTokenCache: ssoTokenCache,
	});
};

const sessionControllers = {
  renderSessionsPage,
};

module.exports = sessionControllers;
