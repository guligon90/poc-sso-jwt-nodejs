const { generateJwt, generatePayload } = require('../token/jwt');
const { fromAuthHeaderAsBearerToken } = require('../common');
const { ssoTokenCache, sessionApp, sessionUser, userDB } = require('../data');
const { appTokenDB } = require('../../common');

const appTokenFromRequest = fromAuthHeaderAsBearerToken();

const verifySsoToken = async (req, res, next) => {
  const appToken = appTokenFromRequest(req);
  const { ssoToken } = req.query;

  // if the application token is not present or ssoToken request is invalid
  // if the ssoToken is not present in the cache some is smart.
  if (
    appToken == undefined ||
    ssoToken == undefined ||
    ssoTokenCache[ssoToken] == undefined
  ) {
    return res.status(400).json({ message: 'badRequest' });
  }

  // if the appToken is present and check if it's valid for the application
  const appName = ssoTokenCache[ssoToken][1];
  const globalSessionToken = ssoTokenCache[ssoToken][0];

  // If the appToken is not equal to token given during the
  // sso app registraion or later stage than invalid
  if (
    appToken !== appTokenDB[appName] ||
    sessionApp[globalSessionToken][appName] !== true
  ) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  // checking if the token passed has been generated
  const payload = generatePayload(
    ssoToken,
    ssoTokenCache,
    sessionUser,
    userDB
  );

  if (payload === undefined) {
    return res.status(401).json({ message: 'The user does not have an access policy set up. Contact the sysadmin' });
  }

  const token = await generateJwt(payload);

  // delete the SSO cache key for no futher use.
  delete ssoTokenCache[ssoToken];

  return res.status(200).json({ token });
};

const tokenControllers = {
  verifySsoToken
};

module.exports = tokenControllers;
