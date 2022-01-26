const db = require('../../db');

module.exports = async ({ body }) => {
  const dueDate =
    body.view.state.values.selected_date.selected_date.selected_option.value;
  const workspaceId = body.view.team_id;
  await db.createSaving(workspaceId, dueDate);
  console.log('Saving Created!');
};
