const controllers = require('../../controllers');

const dateOptions = {
  1201: 'December 1st',
  1224: 'Christmas eve',
  1231: "New Year's eve",
};

//{ message, say, body }
module.exports = async ({ message, say, body }) => {
  // console.log(props);
  // const { message, say, body } = props;
  const happiBank = await controllers.findSaving({ body });
  console.log('hello');
  await say(
    happiBank
      ? `Hey <@${message.user}>! You can open me after ${
          dateOptions[happiBank.dueDate]
        } ⏱`
      : `Hey <@${message.user}>! Please start saving happy memories!`
  );
};
