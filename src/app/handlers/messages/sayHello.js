module.exports = async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
};
