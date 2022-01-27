const db = require('../../db');

module.exports = async ({ body, channelId }) => {
  const workspaceId = body.team_id || body.view.team_id;
  await db.createChannel({ workspaceId, channelId });
};
