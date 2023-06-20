const validReferOrigin = 'http://sso.company.com:3010';
const ssoBaseApiEndpint = `${validReferOrigin}/sso`;
const ssoServerJwtUrl = (ssoToken) =>
  `${ssoBaseApiEndpint}/verifytoken?ssoToken=${ssoToken}`;
const ssoServerLoginUrl = (serviceUrl) =>
  `${ssoBaseApiEndpint}/login?serviceURL=${serviceUrl}`;

// app token to validate the request is coming from the authenticated server only.
const appTokenDB = {
  sso_consumer: 'l1Q7zkOL59cRqWBkQ12ZiGVW2DBL',
  simple_sso_consumer: '1g0jJwGmRQhJwvwNOrY4i90kD0m'
};

const allowedOrigin = {
  'http://consumer.one.company.com:3020': true,
  'http://consumer.two.company.com:3030': true,
  'http://sso.company.com:3080': false
};

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
