const db = require('../../db');

module.exports = async ({ ack, body, client }) => {
  await ack();
  const dueDate =
    body.view.state.values.selected_date.selected_date.selected_option.value;
  const workspaceId = body.view.team_id;
  const userId = body.user.id;
  await db.createSaving(workspaceId, dueDate);
  try {
    await client.views.publish({
      user_id: userId,
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
                  text: '📥  Deposit your happy memory ',
                  emoji: true,
                },
                value: 'addMemory',
                action_id: 'addMemory',
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
