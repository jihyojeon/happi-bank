module.exports = async ({ body, ack, client }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        callback_id: 'createSaving',
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
            block_id: 'selected_date',
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
              action_id: 'selected_date',
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
};
