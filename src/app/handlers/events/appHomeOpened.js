const db = require('../../../db');

const showStartSetting = async ({ event, client }) => {
  try {
    await client.views.publish({
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

const showDepositButton = async ({ event, client }) => {
  try {
    await client.views.publish({
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
                  text: '📥  Deposit your happy memory ',
                  emoji: true,
                },
                value: 'add',
                action_id: 'add',
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

module.exports = async ({ body, event, client }) => {
  const workspaceId = body.team_id;
  const workspace = await db.findSaving(workspaceId);
  workspace
    ? showDepositButton({ event, client })
    : showStartSetting({ event, client });
};
