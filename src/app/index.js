require('dotenv').config();
const { App, LogLevel } = require('@slack/bolt');
const handlers = require('./handlers');
const controllers = require('./controllers');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  // socketMode: true,
  port: process.env.PORT || 3000,
  logLevel: LogLevel.DEBUG,
});

// ONLY FOR TEST
app.message(/when/g, handlers.messages.sayHello);
// app.message('오픈 테스트', handlers.messages.timeToOpen);
// app.action('addMemory', handlers.messages.timeToOpen);

//messages
// /[A-Za-z]/g
app.action('withdraw', handlers.messages.sendMemory);

//events
app.event('app_home_opened', handlers.events.appHomeOpened);

//actions
app.action('startSetting', handlers.actions.startSetting);
app.view('createSaving', controllers.createSaving);
app.action('addMemory', handlers.actions.addMemory);
app.view('updateSaving', controllers.updateSaving);

// //cronjob
// app.use(handlers.scheduler.openReminder);

module.exports = app;
