const url = require("url");
const axios = require("axios");
const { URL } = url;

const { issuer, verifyJwt } = require("../jwt");

const ssoServerJWTURL = "http://sso.ankuranand.com:3010/simplesso/verifytoken";

const checkSSORedirect = () => {
  return async function(req, res, next) {
    // check if the req has the queryParameter as ssoToken
    // and who is the referer.
    const { ssoToken } = req.query;
    
		if (ssoToken != null) {
      // to remove the ssoToken in query parameter redirect.
      const redirectURL = URL.parse(req.url).pathname;
    
			try {
        const response = await axios.get(
          `${ssoServerJWTURL}?ssoToken=${ssoToken}`,
          {
            headers: {
              Authorization: "Bearer l1Q7zkOL59cRqWBkQ12ZiGVW2DBL"
            }
          }
        );
    
				const { token } = response.data;
        const decoded = await verifyJwt(token, issuer);
        // now that we have the decoded jwt, use the,
        // global-session-id as the session id so that
        // the logout can be implemented with the global session.
        req.session.user = decoded;
      } catch (err) {
        return next(err);
      }

      return res.redirect(`${redirectURL}`);
    }

    return next();
  };
};

const redirect = {
    checkSSORedirect,
};

module.exports = redirect;
