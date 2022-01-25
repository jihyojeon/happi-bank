const app = require('./app');

//fire up the app
(async () => {
  await app.start();
  console.log('🐷 Happi Bank is running!');
})();
