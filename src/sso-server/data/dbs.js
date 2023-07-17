const { v4: UUID } = require('uuid');
const Hashids = require('hashids');

const hashids = new Hashids();

const deHyphenatedUUID = () => UUID().replace(/-/gi, '');
const encodedId = () => hashids.encodeHex(deHyphenatedUUID());

const sessionUser = {};

// A temporary cache to store all the application
// that has login using the current session.
// It can be useful for various audit purposes
const sessionApp = {};

// These SSO tokens are generated for validation purposes
const ssoTokenCache = {};

const userDB = {
  'foo@email.com': {
    password: 'foo',
    userId: encodedId(), // In case you don't want to share the user email.
    appPolicy: {
      app_1: { role: 'admin', shareEmail: true },
      app_4: { role: 'user', shareEmail: true },
    }
  },
  'bar@email.com': {
    password: 'bar',
    userId: encodedId(),
    appPolicy: {
      app_1: { role: 'supervisor', shareEmail: false },
      app_2: { role: 'user', shareEmail: true },
      app_3: { role: 'admin', shareEmail: true },
    }
  },
  'foobar@email.com': {
    password: 'foobar',
    userId: encodedId(),
    appPolicy: {
      app_2: { role: 'supervisor', shareEmail: false },
      app_4: { role: 'user', shareEmail: true },
    }
  },
};

const dbs = {
  encodedId,
  userDB,
  sessionApp,
  sessionUser,
  ssoTokenCache
};

module.exports = dbs;
