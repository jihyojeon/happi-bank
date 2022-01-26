require('dotenv').config();
const { App } = require('@slack/bolt');
const handlers = require('./handlers');
const controllers = require('./controllers');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

// ONLY FOR TEST
app.message('오픈 테스트', handlers.messages.timeToOpen);
app.message('메모리 테스트', handlers.messages.sendMemory);

//messages
app.message(/[A-Za-z]/g, handlers.messages.sayHello);
app.action('withdraw', handlers.messages.sendMemory);

//events
app.event('app_home_opened', handlers.events.appHomeOpened);

//actions
app.action('startSetting', handlers.actions.startSetting);
app.view('createSaving', controllers.createSaving);
app.action('addMemory', handlers.actions.addMemory);
app.view('updateSaving', controllers.updateSaving);

// const CronJob = require('cron').CronJob;
// const job = new CronJob(
//   '* * * * * *', // cronTime
//   function () {
//     console.log('You will see this message every second');
//   }, // onTick
//   null, // onComplete
//   true, // start
//   'America/Los_Angeles' // timezone
// );
// job.start();

module.exports = app;
