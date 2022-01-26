const db = require('../../db');
const moment = require('moment');

module.exports = async ({ body }) => {
  const YYYY = moment().format('YYYY');
  const workspaceId = body.team_id || body.user.team_id;
  const happiBank = await db.findSaving({ workspaceId });

  if (!happiBank.pastYears[YYYY]) {
    await db.stuffingThisYear({ workspaceId, YYYY });
  }
  const memory = await db.popMemory({ workspaceId });

  return memory;
};
