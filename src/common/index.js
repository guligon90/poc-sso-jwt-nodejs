const definitions = require('./definitions');
const parser = require('./arguments');

const common = {
  ...definitions,
  ...parser,
};

module.exports = common;
