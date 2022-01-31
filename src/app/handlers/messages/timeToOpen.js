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
    console.error(error.data.error);
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
    console.error(error);
    if (error.data.error === 'channel_not_found') {
      // create channel and update channelID
      const newChannelID = createChannel({ body, client });
      // and invite again
      await inviteAll({
        channelId: newChannelID,
        userIds,
        context,
        client,
        body,
      });
      return newChannelID;
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
  channelId = await inviteAll({ channelId, userIds, context, client });

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
