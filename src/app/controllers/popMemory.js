const db = require('../../db');
const moment = require('moment');

module.exports = async ({ body }) => {
  const YYYY = moment().format('YYYY');
  const workspaceId = body.team_id;
  const happiBank = await db.findSaving({ workspaceId });

  happiBank.pastYears[YYYY]
    ? db.popMemory({ workspaceId })
    : db.stuffingThisYear({ workspaceId, YYYY });

  return happiBank;
};
