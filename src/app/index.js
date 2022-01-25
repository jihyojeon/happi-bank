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
app.message('hello', handlers.messages.sayHello);

//events
app.event('app_home_opened', handlers.events.appHomeOpened);

//actions
app.action('startSetting', handlers.actions.startSetting);

app.view('createSaving', controllers.createSaving);

module.exports = app;
