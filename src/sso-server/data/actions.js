const { render } = require('prettyjson');

const { ssoTokenCache, sessionApp, sessionUser } = require('./dbs');
const { originAppName } = require('../../common');

const fillssoTokenCache = (origin, id, ssoToken) => {
  ssoTokenCache[ssoToken] = [id, originAppName[origin]];

  return ssoTokenCache;
};

const storeApplicationInCache = (origin, id, ssoToken) => {
  if (sessionApp[id] == null) {
    sessionApp[id] = {
      [originAppName[origin]]: true
    };

    fillssoTokenCache(origin, id, ssoToken);
  } else {
    sessionApp[id][originAppName[origin]] = true;

    fillssoTokenCache(origin, id, ssoToken);
  }


  console.log('sessionApp', render({...sessionApp}));
  console.log('sessionUser', render({...sessionUser}));
  console.log('ssoTokenCache', render({...ssoTokenCache}));

  //console.log({ ...sessionApp }, { ...sessionUser }, { ssoTokenCache });
};

const actions = {
  fillssoTokenCache,
  storeApplicationInCache
};

module.exports = actions;
