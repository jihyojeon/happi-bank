const controllers = require('../../controllers');
const moment = require('moment');

const sendLast = async ({ say, message }) => {
  await say({
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

const sendOne = async ({ say, message }) => {
  await say({
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

module.exports = async ({ body, say, ack }) => {
  ack();
  const { text, userId, date, isLast } = await controllers.popMemory({ body });
  const message = `${text} \n _-${moment(date).format(
    'Do MMM'
  )}_, <@${userId}>`;
  isLast ? sendLast({ say, message }) : sendOne({ say, message });
};
