const controllers = require('../../controllers');

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

module.exports = async ({ body, event, client }) => {
  const happiBank = await controllers.findSaving({ body });
  happiBank
    ? showDepositButton({ event, client })
    : showStartSetting({ event, client });
};
