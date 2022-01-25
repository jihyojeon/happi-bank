const app = require('./app');
const db = require('./db');

//fire up the app
(async () => {
  await app.start();
  console.log('🐷 Happi Bank is running!');
})();
