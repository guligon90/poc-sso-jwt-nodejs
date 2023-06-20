const jwt = require('jsonwebtoken');
const { publicKey } = require('../config').keys;

const verifyJwt = (token, issuer) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      { issuer, algorithms: ['RS256'] },
      (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
  });

const verification = {
  verifyJwt
};

module.exports = verification;
