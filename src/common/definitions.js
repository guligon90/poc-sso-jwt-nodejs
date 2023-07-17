const validReferOrigin = 'http://sso.company.com:3010';
const ssoBaseApiEndpint = `${validReferOrigin}/sso`;

// Endpoint to verify the client ID and generate a new JWT
const ssoServerJwtUrl = (ssoToken) =>
  `${ssoBaseApiEndpint}/verifytoken?ssoToken=${ssoToken}`;

// Endpoint for login redirection the client app to the SSO service
const ssoServerLoginUrl = (serviceUrl) =>
  `${ssoBaseApiEndpint}/signin?serviceURL=${serviceUrl}`;

// Endpoint for logout redirection the client app to the SSO service
const ssoServerLogoutUrl = (serviceUrl) =>
  `${ssoBaseApiEndpint}/signout?serviceURL=${serviceUrl}`;

// App token to validate the request is coming from the authenticated server only.
const appTokenDB = {
  app_1: 'l1Q7zkOL59cRqWBkQ12ZiGVW2DBL',
  app_2: '1g0jJwGmRQhJwvwNOrY4i90kD0m',
  app_3: 'GmQqA78zKki3jnPQYDZQcgzB8X3',
  app_4: 'RQXr2WwjooCD532GYEL9HAmzj7O',
};

// Map that determines if the corresponding service can access the SSO
const allowedOrigin = {
  'http://app.one.company.com:3021': true,
  'http://app.two.company.com:3022': true,
  'http://app.three.company.com:3023': false,
  'http://app.four.company.com:3024': true,
};

// Perform the mapping between the service name and origin URL
const originAppName = {
  'http://app.one.company.com:3021': 'app_1',
  'http://app.two.company.com:3022': 'app_2',
  'http://app.three.company.com:3023': 'app_3',
  'http://app.four.company.com:3024': 'app_4',
};

const definitions = {
  appTokenDB,
  allowedOrigin,
  originAppName,
  ssoServerJwtUrl,
  ssoServerLoginUrl,
  ssoServerLogoutUrl,
  validReferOrigin,
};

module.exports = definitions;
