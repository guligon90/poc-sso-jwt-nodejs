const actions = require('./actions');
const dbs = require('./dbs');

const data = {
  ...actions,
  ...dbs
};

module.exports = data;
