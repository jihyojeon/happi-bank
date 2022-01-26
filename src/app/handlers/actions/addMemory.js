module.exports = async ({ body, ack, client }) => {
  await ack();
  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        callback_id: 'updateSaving',
        title: {
          type: 'plain_text',
          text: 'Deposit your happiness',
          emoji: true,
        },
        submit: {
          type: 'plain_text',
          text: 'Save',
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
              text: 'Please share your story 🥰',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'input',
            block_id: 'text',
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'text',
            },
            label: {
              type: 'plain_text',
              text: "Today's happy memory",
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
                text: '😊 I am happy that you’re happy!',
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
