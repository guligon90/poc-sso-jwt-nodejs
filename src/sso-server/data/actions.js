const { intrmTokenCache, sessionApp, sessionUser } = require('./dbs');
const { originAppName } = require('../../common');

const fillIntrmTokenCache = (origin, id, intrmToken) => {
  intrmTokenCache[intrmToken] = [id, originAppName[origin]];

  return intrmTokenCache;
};

const storeApplicationInCache = (origin, id, intrmToken) => {
  if (sessionApp[id] == null) {
    sessionApp[id] = {
      [originAppName[origin]]: true
    };

    fillIntrmTokenCache(origin, id, intrmToken);
  } else {
    sessionApp[id][originAppName[origin]] = true;

    fillIntrmTokenCache(origin, id, intrmToken);
  }

  console.log({ ...sessionApp }, { ...sessionUser }, { intrmTokenCache });
};

const actions = {
  fillIntrmTokenCache,
  storeApplicationInCache
};

module.exports = actions;
