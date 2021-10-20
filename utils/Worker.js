const Worker = require("../models/WorkerSchema.js");

exports.FindWorker = async (ID, num, task) => {
  const workers = await Worker.find({ ownerId: ID, task, status: "ready" });
  if (workers.length <= 0) {
    return "no availible workers";
  }
  const { phoneNumber } = workers[0];
  return phoneNumber;
};
exports.CreateWorker = async(ownerId,task,) => {}
