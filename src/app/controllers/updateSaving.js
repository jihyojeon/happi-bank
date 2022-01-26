const db = require('../../db');
const moment = require('moment');

module.exports = async ({ body, ack }) => {
  ack();
  const workspaceId = body.view.team_id;
  const userId = body.user.id;
  const text = body.view.state.values.text.text.value;
  const date = moment().format();
  const context = { text, userId, date };
  await db.updateSaving({ workspaceId, context });
};
