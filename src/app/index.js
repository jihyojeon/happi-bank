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

//messages
app.message(/[A-Za-z]/g, handlers.messages.sayHello);

//events
app.event('app_home_opened', handlers.events.appHomeOpened);

//actions
app.action('startSetting', handlers.actions.startSetting);
app.action('addMemory', handlers.actions.addMemory);

//views
app.view('createSaving', controllers.createSaving);
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
