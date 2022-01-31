const controllers = require('../../controllers');

const getAllUsers = async ({ client }) => {
  const userIds = [];
  try {
    const result = await client.users.list();
    result.members.forEach(({ id, is_bot }) => {
      !is_bot && userIds.push(id);
    });
  } catch (error) {
    console.error(error);
  }
  return userIds.join(', ');
};

const createChannel = async ({ body, client }) => {
  try {
    const result = await client.conversations.create({
      name: 'happi-memories',
    });
    channelId = result.channel.id;
    controllers.updateId({ body, channelId });
    return channelId;
  } catch (error) {
    if (error.data.error === 'name_taken') {
      //ignore
    } else {
      console.error(error.data.error);
    }
  }
};

const inviteAll = async ({ channelId, userIds, context, client, body }) => {
  try {
    await client.conversations.invite({
      channel: channelId,
      users: userIds,
      token: context.botToken,
    });
    return channelId;
  } catch (error) {
    if (
      error.data.error === 'channel_not_found' ||
      error.data.error === 'not_in_channel'
    ) {
      const newChannelId = await createChannel({ body, client });
      await inviteAll({
        channelId: newChannelId,
        userIds,
        context,
        client,
        body,
      });
    } else {
      console.error(error.data.error);
    }
  }
};

module.exports = async ({ body, client, context, say }) => {
  const userIds = await getAllUsers({ client });

  const Happibank = await controllers.findSaving({ body });
  let channelId = Happibank.channelId;

  if (!channelId) {
    channelId = await createChannel({ body, client });
  }
  channelId = await inviteAll({ channelId, userIds, context, body, client });

  try {
    await client.chat.postMessage({
      channel: channelId,
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
              value: 'withdraw',
              action_id: 'withdraw',
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};
