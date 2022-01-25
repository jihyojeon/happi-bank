module.exports = async ({ event, client }) => {
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
};
