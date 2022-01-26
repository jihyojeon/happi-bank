const db = require('../../db');

module.exports = async ({ body }) => {
  const workspaceId = body.team_id;
  const happiBank = await db.findSaving({ workspaceId });
  return happiBank;
};
