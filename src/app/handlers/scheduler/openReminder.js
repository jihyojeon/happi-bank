const messages = require('../messages');
const controllers = require('../../controllers');
const moment = require('moment');
const CronJob = require('cron').CronJob;

module.exports = async ({ body, client, context }) => {
  // 언제 언제 확인하느냐!?
  // 12월 1일, 12월 25일, 12월 31일
  // const possibleDate = ['0 9 1 12 *', '0 9 25 12 *', '0 9 31 12 *'];
  // 만약 12월 1에 오픈하고 다음 년도 세팅을 12월 25일로 했다면??
  // pastYears에 올해가 이미 들어있는지 확인해야함. 첫번째 메세지 보낼 때 박제하니까
  const job = new CronJob(
    '0 9 * * *', // at 9 everyday
    async () => {
      const Happibank = await controllers.findSaving({ body });
      const today = moment().format('MMDD');
      const dueDate = Happibank.dueDate;
      if (today === dueDate) {
        messages.timeToOpen({ body, client, context, Happibank });
      }
    }, // onTick
    null, // onComplete
    true, // start
    'Europe/London' // timezone
  );

  job.start();
};
