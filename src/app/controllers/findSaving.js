const db = require('../../db');

module.exports = async ({ body }) => {
  const workspaceId = body.team_id;
  const workspace = await db.findSaving(workspaceId);
  return workspace;
};
