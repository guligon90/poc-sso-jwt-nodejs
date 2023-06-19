const URL = require("url").URL;
const { sessionUser } = require("../data");

const doLogin = (req, res, next) => {
  // do the validation with email and password
  // but the goal is not to do the same in this right now,
  // like checking with Datebase and all, we are skiping these section
  const { email, password } = req.body;
  
  if (!(userDB[email] && password === userDB[email].password)) {
    return res.status(404).json({ message: "Invalid email and password" });
  }

  // else redirect
  const { serviceURL } = req.query;
  const id = encodedId();
  
  req.session.user = id;
  sessionUser[id] = email;
  
  if (serviceURL == null) {
    return res.redirect("/");
  }
  
  const url = new URL(serviceURL);
  const intrmid = encodedId();
  
  storeApplicationInCache(url.origin, id, intrmid);
  
  return res.redirect(`${serviceURL}?ssoToken=${intrmid}`);
};

const login = (req, res, next) => {
  // The req.query will have the redirect url where we need to redirect after successful
  // login and with sso token.
  // This can also be used to verify the origin from where the request has came in
  // for the redirection
  const { serviceURL } = req.query;
  
  // direct access will give the error inside new URL.
  if (serviceURL != null) {
    const url = new URL(serviceURL);
  
    if (alloweOrigin[url.origin] !== true) {
      return res
        .status(400)
        .json({ message: "Your are not allowed to access the sso-server" });
    }
  }
  
  if (req.session.user != null && serviceURL == null) {
    return res.redirect("/");
  }
  
  // if global session already has the user directly redirect with the token
  if (req.session.user != null && serviceURL != null) {
    const url = new URL(serviceURL);
    const intrmid = encodedId();
  
    storeApplicationInCache(url.origin, req.session.user, intrmid);
  
    return res.redirect(`${serviceURL}?ssoToken=${intrmid}`);
  }

  return res.render("login", {
    title: "SSO-Server | Login"
  });
};

const loginControllers = {
	doLogin,
	login,
};

module.exports = loginControllers;
