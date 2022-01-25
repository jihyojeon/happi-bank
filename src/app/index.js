require('dotenv').config();
const { App } = require('@slack/bolt');
const handlers = require('./handlers');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});

//events
app.event('app_home_opened', handlers.events.appHomeOpened);

//actions
app.action('startSetting', handlers.actions.startSetting);

module.exports = app;
