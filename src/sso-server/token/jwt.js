const jwt = require('jsonwebtoken');
const { privateCert } = require('../config').keys;

const ISSUER = 'simple-sso';

const generateJwt = (payload) =>
  new Promise((resolve, reject) => {
    // some of the libraries and libraries written in other language,
    // expect base64 encoded secrets, so sign using the base64 to make
    // jwt useable across all platform and language.
    jwt.sign(
      { ...payload },
      privateCert,
      {
        algorithm: 'RS256',
        expiresIn: '1h',
        issuer: ISSUER
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });

const generatePayload = (ssoToken, ssoTokenCache, sessionUser, userDB) => {
  const globalSessionToken = ssoTokenCache[ssoToken][0];
  const appName = ssoTokenCache[ssoToken][1];
  const userEmail = sessionUser[globalSessionToken];
  const user = userDB[userEmail];
  const appPolicy = user.appPolicy[appName];

  if (appPolicy === undefined) {
    return;
  }

  const email = appPolicy.shareEmail === true ? userEmail : undefined;

  const payload = {
    ...{ ...appPolicy },
    ...{
      email,
      shareEmail: undefined,
      uid: user.userId,
      // global SessionID for the logout functionality.
      globalSessionID: globalSessionToken
    }
  };

  return payload;
};

const generators = {
  generatePayload,
  generateJwt
};

module.exports = generators;
