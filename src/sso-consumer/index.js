const app = require('./app');
const { ArgumentParser } = require('../common');

(() => {
  const paramString = process.argv[2];

  if (paramString === undefined) {
    console.warn('USAGE: node index.js --hostname=some.host.com --port=3000');
    process.exit();
  }

  process.app = ArgumentParser(paramString);;

  app.listen(process.app.port, () => {
    console.info(`Client "${process.app.hostname}" listening on port ${process.app.port}`);
  });
})();
