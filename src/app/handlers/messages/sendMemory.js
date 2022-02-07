const controllers = require('../../controllers');
const moment = require('moment');

const sendLast = async ({ channelId, message, client }) => {
  await client.chat.postMessage({
    channel: channelId,
    blocks: [
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: "👏👏👏 You've been great this year.",
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'This was the last one. Do you want to start *new* saving for the next year?',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '🌱 Start saving happy memories',
              emoji: true,
            },
            value: 'startSetting',
            action_id: 'startSetting',
          },
        ],
      },
    ],
  });
};

const sendOne = async ({ channelId, message, client }) => {
  await client.chat.postMessage({
    channel: channelId,
    blocks: [
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '💗 Thank you, Next 💗',
              emoji: true,
            },
            value: 'withdraw',
            action_id: 'withdraw',
          },
        ],
      },
    ],
  });
};

module.exports = async ({ body, ack, client }) => {
  ack();
  const happiBank = await controllers.findSaving({ body });
  const channelId = happiBank.channelId;
  const { text, userId, date, isLast } = await controllers.popMemory({ body });
  const message = `${text} \n _-${moment(date).format(
    'Do MMM'
  )}_, <@${userId}>`;
  isLast
    ? sendLast({ channelId, message, client })
    : sendOne({ channelId, message, client });
};
