require('dotenv').config();
const { App, LogLevel } = require('@slack/bolt');
const handlers = require('./handlers');
const controllers = require('./controllers');
const { checkAll } = require('../db');
const CronJob = require('cron').CronJob;
const moment = require('moment');

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

//cronjob
const todo = (workspace) => {
  const workspaceId = workspace[0];
  const dueDate = workspace[1];
  const today = moment().format('MMDD');
  if (today === dueDate) {
    handlers.messages.timeToOpen({ workspaceId, client: app.client });
  }
  // handlers.messages.timeToOpen({ workspaceId, client: app.client });
};

const job = new CronJob(
  '0 9 * * *', // at 9 everyday
  // '* * * * *',
  async () => {
    const workspaces = await checkAll();
    workspaces.forEach((workspace) => {
      console.log(workspace);
      todo(workspace);
    });
  }, // onTick
  null, // onComplete
  true, // start
  'Europe/London' // timezone
);

job.start();

module.exports = app;
