const { CronJob } = require("cron");
const logger = require("../logger");

const everyMinuteCronTime = "0 0-59 * * * *";
const everyHourCronTime = "0 0 0-23 * * *";
const executionCronTime = everyMinuteCronTime;

function updatePredictionsOwners() {
  console.log("Run updatePredictionsOwners job");
}

const updatePredictionsOwnersJob = new CronJob(
  executionCronTime,
  updatePredictionsOwners,
  null,
  false,
  "America/Los_Angeles"
);

function start() {
  try {
    logger.info("updatePredictionsOwnersJob start");

    updatePredictionsOwnersJob.start();

    logger.info("updatePredictionsOwnersJob started successful");
  } catch (error) {
    logger.error("Unable start updatePredictionsOwnersJob", error);
  }
}

module.exports = {
  job: updatePredictionsOwnersJob,
  start,
};
