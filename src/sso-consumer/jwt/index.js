const verification = require('./verification');

const jwt = {
  issuer: 'simple-sso',
  ...verification
};

module.exports = jwt;
