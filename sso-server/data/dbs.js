const uuidv4 = require("uuid/v4");
const Hashids = require("hashids");
const hashids = new Hashids();

const deHyphenatedUUID = () => uuidv4().replace(/-/gi, "");
const encodedId = () => hashids.encodeHex(deHyphenatedUUID());

// A temporary cache to store all the application that has login using the current session.
// It can be useful for various audit purpose
const sessionUser = {};
const sessionApp = {};

// these token are for the validation purpose
const intrmTokenCache = {};

// app token to validate the request is coming from the authenticated server only.
const appTokenDB = {
	sso_consumer: "l1Q7zkOL59cRqWBkQ12ZiGVW2DBL",
	simple_sso_consumer: "1g0jJwGmRQhJwvwNOrY4i90kD0m",
};
  
const alloweOrigin = {
	"http://consumer.ankuranand.in:3020": true,
	"http://consumertwo.ankuranand.in:3030": true,
	"http://sso.ankuranand.in:3080": false,
};

const originAppName = {
  "http://consumer.ankuranand.in:3020": "sso_consumer",
  "http://consumertwo.ankuranand.in:3030": "simple_sso_consumer"
};

const userDB = {
  "info@ankuranand.com": {
    password: "test",
    userId: encodedId(), // incase you don't want to share the user-email.
    appPolicy: {
      sso_consumer: { role: "admin", shareEmail: true },
      simple_sso_consumer: { role: "user", shareEmail: false }
    }
  }
};

const dbs = {
	originAppName,
	userDB,
	appTokenDB,
	alloweOrigin,
	sessionApp,
	sessionUser,
	intrmTokenCache,
};

module.exports = dbs;