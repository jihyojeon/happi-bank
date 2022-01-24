const { App } = require('@slack/bolt');
require('dotenv').config();

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

app.event('app_home_opened', async ({ event, client }) => {
  try {
    const result = await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '🌱  Start saving happy memories',
                  emoji: true,
                },
                value: 'startSetting',
                action_id: 'startSetting',
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.action('startSetting', async ({ body, ack, client }) => {
  await ack();
  try {
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        title: {
          type: 'plain_text',
          text: 'Create your vault',
          emoji: true,
        },
        submit: {
          type: 'plain_text',
          text: 'Create',
          emoji: true,
        },
        type: 'modal',
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true,
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: "Hey💗 I am *Happi Bank* saving your team's happy memories! Please select the date _when_ you want to open my belly!",
            },
          },
          {
            type: 'input',
            element: {
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select date',
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: '❄️ 1st of December',
                    emoji: true,
                  },
                  value: '1201',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '🎄 Christmas Eve',
                    emoji: true,
                  },
                  value: '1224',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: "✨ New Year's Eve",
                    emoji: true,
                  },
                  value: '1231',
                },
              ],
              action_id: 'static_select-action',
            },
            label: {
              type: 'plain_text',
              text: '🎁  When do you want to open my belly?',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: '❗️ You *cannot* see memories before this date.',
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start();
  console.log('🐷 Happi Bank is running!');
})();
