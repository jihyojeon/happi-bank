const controllers = require('../../controllers');

const dateOptions = {
  1201: 'December 1st',
  1224: 'Christmas eve',
  1231: "New Year's eve",
};

module.exports = async ({ message, say, body }) => {
  const happiBank = await controllers.findSaving({ body });
  await say(
    happiBank
      ? `Hey <@${message.user}>! You can open me after ${
          dateOptions[happiBank.dueDate]
        } ⏱`
      : `Hey <@${message.user}>! Please start saving happy memories!`
  );
};
