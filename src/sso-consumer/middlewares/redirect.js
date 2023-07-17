const url = require('url');
const axios = require('axios');

const { issuer, verifyJwt } = require('../jwt');
const { originAppName, appTokenDB, ssoServerJwtUrl } = require('../../common');

const checkSSORedirect = () =>
  async function (req, res, next) {
    // check if the req has the queryParameter as ssoToken
    // and who is the referer.
    const { ssoToken } = req.query;

    if (ssoToken != null) {
      // to remove the ssoToken in query parameter redirect.
      const redirectURL = url.parse(req.url).pathname;

      try {
        // Getting the token associated with the
        // incoming host from SSO request.
        const appUrl = `${req.protocol}://${req.get('host')}`;
        const appToken = appTokenDB[originAppName[appUrl]];

        const response = await axios.get(ssoServerJwtUrl(ssoToken), {
          headers: { Authorization: `Bearer ${appToken}` }
        });

        const { token } = response.data;
        const decoded = await verifyJwt(token, issuer);

        // Now that we have the decoded JWT, use the,
        // global-session-id as the session ID so that
        // the logout can be implemented with the global session.
        req.session.user = decoded;
        
      } catch (err) {
        const { response } = err;

        if (response !== undefined) {
          const { data, status } = response;

          return res.status(status).json(data)
        }

        return next(err);
      }

      return res.redirect(`${redirectURL}`);
    }

    return next();
  };

const redirect = {
  checkSSORedirect
};

module.exports = redirect;
