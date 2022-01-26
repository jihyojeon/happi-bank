const controllers = require('../../controllers');
const moment = require('moment');

module.exports = async ({ body, say }) => {
  const { text, userId, date } = await controllers.popMemory({ body });
  const message = `${text} \n _-${moment(date).format(
    'Do MMM'
  )}_, <@${userId}>`;
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
