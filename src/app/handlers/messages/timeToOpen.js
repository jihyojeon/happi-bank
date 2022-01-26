module.exports = async ({ say }) => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: "🎉 *Time to see this year's happy memories!*",
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '💗 Click Me 💗',
              emoji: true,
            },
            value: 'click_me_123',
            action_id: 'actionId-0',
          },
        ],
      },
    ],
  });
};
