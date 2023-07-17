const { ssoServerLoginUrl } = require('../../common');

const isAuthenticated = (req, res, next) => {
  // simple check to see if the user is authenticated or not,
  // if not redirect the user to the SSO Server for Login
  // pass the redirect URL as current URL
  // serviceURL is where the sso should redirect in case of valid user
  const { user } = req.session;

  if (user === undefined) {
    const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;

    return res.redirect(ssoServerLoginUrl(redirectURL));
  }

  next();
};

const authentication = {
  isAuthenticated
};

module.exports = authentication;
