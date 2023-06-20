const uuidv4 = require('uuid/v4');
const Hashids = require('hashids');

const hashids = new Hashids();

const deHyphenatedUUID = () => uuidv4().replace(/-/gi, '');
const encodedId = () => hashids.encodeHex(deHyphenatedUUID());

// A temporary cache to store all the application that has login using the current session.
// It can be useful for various audit purpose
const sessionUser = {};
const sessionApp = {};

// these token are for the validation purpose
const intrmTokenCache = {};

const userDB = {
  'test@email.com': {
    password: 'test',
    userId: encodedId(), // In case you don't want to share the user email.
    appPolicy: {
      sso_consumer: { role: 'admin', shareEmail: true },
      simple_sso_consumer: { role: 'user', shareEmail: false }
    }
  }
};

const dbs = {
  encodedId,
  userDB,
  sessionApp,
  sessionUser,
  intrmTokenCache
};

module.exports = dbs;
