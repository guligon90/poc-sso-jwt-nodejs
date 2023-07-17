const { URL } = require('url');
const { allowedOrigin } = require('../../common');
const {
  encodedId,
  sessionUser,
  userDB,
  storeApplicationInCache
} = require('../data');

const doLogin = (req, res, next) => {
  // do the validation with email and password
  // but the goal is not to do the same in this right now,
  // like checking with Datebase and all, we are skiping these section
  const { email, password } = req.body;

  if (!(userDB[email] && password === userDB[email].password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // else redirect
  const { serviceURL } = req.query;
  const id = encodedId();

  req.session.user = id;
  sessionUser[id] = email;

  if (serviceURL == null) {
    return res.redirect('/');
  }

  const origin = new URL(serviceURL).origin;
  const ssoToken = encodedId();

  storeApplicationInCache(origin, id, ssoToken);

  return res.redirect(`${serviceURL}?ssoToken=${ssoToken}`);
};

const login = (req, res, next) => {
  // The req.query will have the redirect url where we need to redirect after successful
  // login and with sso token.
  // This can also be used to verify the origin from where the request has came in
  // for the redirection
  const { serviceURL } = req.query;
  const { user } = req.session;
 
  // direct access will give the error inside new URL.
  if (serviceURL !== undefined) {
    const origin = new URL(serviceURL).origin;

    if (allowedOrigin[origin] !== true) {
      return res
        .status(401)
        .json({ message: `The origin ${origin} is not allowed to make request to the SSO service` });
    }

    if (user != undefined) {
      const ssoToken = encodedId();

      storeApplicationInCache(origin, user, ssoToken);

      return res.redirect(`${serviceURL}?ssoToken=${ssoToken}`);
    }
  }

  // if (user != undefined) {
  //   return res.redirect('/');
  // }

  return res.render('login', {
    title: 'SSO-Server | Login',
    //externalRequest: serviceURL !== undefined,
    externalRequest: serviceURL !== undefined,
  });
};

const loginControllers = {
  doLogin,
  login
};

module.exports = loginControllers;
