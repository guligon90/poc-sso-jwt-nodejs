const validReferOrigin = 'http://sso.company.com:3010';
const ssoBaseApiEndpint = `${validReferOrigin}/sso`;

// Endpoint to verify the client ID and generate a new JWT
const ssoServerJwtUrl = (ssoToken) =>
  `${ssoBaseApiEndpint}/verifytoken?ssoToken=${ssoToken}`;

// Endpoint for redirecting the client app to the SSO service
const ssoServerLoginUrl = (serviceUrl) =>
  `${ssoBaseApiEndpint}/login?serviceURL=${serviceUrl}`;

// App token to validate the request is coming from the authenticated server only.
const appTokenDB = {
  sso_consumer: 'l1Q7zkOL59cRqWBkQ12ZiGVW2DBL',
  simple_sso_consumer: '1g0jJwGmRQhJwvwNOrY4i90kD0m'
};

// Map that determines if the corresponding service can access the SSO
const allowedOrigin = {
  'http://consumer.one.company.com:3020': true,
  'http://consumer.two.company.com:3030': true,
  'http://sso.company.com:3080': false
};

// Perform the mapping between the service name and origin URL
const originAppName = {
  'http://consumer.one.company.com:3020': 'sso_consumer',
  'http://consumer.two.company.com:3030': 'simple_sso_consumer'
};

const definitions = {
  appTokenDB,
  allowedOrigin,
  originAppName,
  ssoServerJwtUrl,
  ssoServerLoginUrl,
  validReferOrigin
};

module.exports = definitions;
