const controllers = require('../../controllers');

const sampleText = `Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory Sample Memory \n - _18th Jan, Jihyo_`;

module.exports = async ({ say }) => {
  await say({
    blocks: [
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: sampleText,
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
