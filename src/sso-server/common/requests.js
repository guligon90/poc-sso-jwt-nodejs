const re = /(\S+)\s+(\S+)/;

// Note: express http converts all headers to lower case.
const AUTH_HEADER = 'authorization';
const BEARER_AUTH_SCHEME = 'bearer';

function parseAuthHeader(headerValue) {
  if (typeof headerValue !== 'string') {
    return null;
  }

  const matches = headerValue.match(re);

  return matches && { scheme: matches[1], value: matches[2] };
}

const fromAuthHeaderWithScheme = function (authScheme) {
  const authSchemeLower = authScheme.toLowerCase();

  return function (request) {
    let token = null;

    if (request.headers[AUTH_HEADER]) {
      const authParams = parseAuthHeader(request.headers[AUTH_HEADER]);

      if (authParams && authSchemeLower === authParams.scheme.toLowerCase()) {
        token = authParams.value;
      }
    }

    return token;
  };
};

const fromAuthHeaderAsBearerToken = function () {
  return fromAuthHeaderWithScheme(BEARER_AUTH_SCHEME);
};

const requests = {
  fromAuthHeaderWithScheme,
  fromAuthHeaderAsBearerToken,
  parseAuthHeader
};

module.exports = requests;
