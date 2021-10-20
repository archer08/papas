const { sendMessage } = require("../config/twilloConfig.js");
const Worker = require("../models/WorkerSchema.js");

exports.FindWorker = async (ID, num, task) => {
  const workers = await Worker.find({ ownerId: ID, task, status: "ready" });
  if (workers.length <= 0) {
    return "no availible workers";
  }
  const { phoneNumber } = workers[0];
  return phoneNumber;
};
exports.MessageContact = async (Id, task, receiver, message) => {
  if (this.FindWorker(Id) !== null) {
    sendMessage(message, this.FindWorker(Id), receiver);
  }
};
exports.CreateWorker = async (ownerId, task, phoneNumber) => {
  try {
    const worker = await Worker.create({ ownerId, task, phoneNumber });
    return worker;
  } catch (err) {
    return err;
  }
};
