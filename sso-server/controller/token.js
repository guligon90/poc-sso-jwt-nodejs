const { generateJwt, generatePayload } = require("../token/jwt");
const { fromAuthHeaderAsBearerToken } = require("../common/requests");
const { appTokenDB, intrmTokenCache, sessionApp } = require("../data");


const appTokenFromRequest = fromAuthHeaderAsBearerToken();

const verifySsoToken = async (req, res, next) => {
  const appToken = appTokenFromRequest(req);
  const { ssoToken } = req.query;
  
	// if the application token is not present or ssoToken request is invalid
  // if the ssoToken is not present in the cache some is
  // smart.
  if (
    appToken == null ||
    ssoToken == null ||
    intrmTokenCache[ssoToken] == null
  ) {
    return res.status(400).json({ message: "badRequest" });
  }

  // if the appToken is present and check if it's valid for the application
  const appName = intrmTokenCache[ssoToken][1];
  const globalSessionToken = intrmTokenCache[ssoToken][0];
  
	// If the appToken is not equal to token given during the sso app registraion or later stage than invalid
  if (
    appToken !== appTokenDB[appName] ||
    sessionApp[globalSessionToken][appName] !== true
  ) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
	// checking if the token passed has been generated
  const payload = generatePayload(ssoToken);
  const token = await generateJwt(payload);
  
	// delete the itremCache key for no futher use,
  delete intrmTokenCache[ssoToken];
  
	return res.status(200).json({ token });
};

const tokenControllers = {
	verifySsoToken,
};

module.exports = tokenControllers;

