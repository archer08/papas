const ConversationModel = require("../models/ConversationModel");
const MessageModel = require("../models/MessageModel");
const WorkerSchema = require("../models/WorkerSchema");
const User = require("../models/usrSchema");
const { encrypt } = require("./encryption");
//1. check for conversation
exports.CheckConversationHandler = async (host, participant) => {
  try {
    const check = await ConversationModel.findOne({ host, participant });
    if (check) {
      return { conversation: true, Id: check.id, status: "Success" };
    } else {
      return { conversation: false, status: "Error" };
    }
  } catch (err) {
    return { status: "Error", error: err };
  }
};
//1.1 create conversation
exports.CreateConversationHandler = async (
  host,
  participant,
  worker,
  connectionTime
) => {
  const conversation = {
    host,
    participant,
    data: { workerId: worker, connectionTime },
  };
  const save = await ConversationModel.create(conversation);
};
//2. create message object
exports.CreateMessageObjectHandler = async (...data) => {};
//3. encrypt message
exports.EncryptionHandler = async (text) => {
  return encrypt(text);
};
//4. log message
exports.LogMessageHandler = async (messageData) => {
  const { sender, reciever, message, data } = messageData;
  try {
    await MessageModel.create({ message, sender, reciever, data });
    return { status: "Success" };
  } catch (err) {
    return { status: "Error", error: err };
  }
};
//5.add message to coversation
//6.relay message
//7. message

exports.MessageHandler = async (data) => {
  const { host, participant, sender, workerId, message } = data;
  //check for conversation
  const conversationCheck = this.CheckConversationHandler(host, participant);
  if (conversationCheck.status === "Success") {
    //create message object
    const messageData = {
      sender,
      workerId,
      message: this.EncryptionHandler(message),
      data: {
        conversation: conversationCheck.id,
        timeSent: new Date.now(),
        messageType: "regular",
        encrypted: true,
        status: "Created",
      },
    };
    //log the measse to database
    await this.LogMessageHandler(messageData);
    // if no conversation create one
  } else if (conversationCheck.status === "Success") {
    const user = await User.find({ phoneNumber: host });
    const { worker } = await this.FindWorkerHandler(user.id);
    const conversation = await this.CreateConversationHandler(
      host,
      participant,
      worker
    );
  }
  // relay the message
};
exports.FindWorkerHandler = async (Id) => {
  try {
    const workers = await WorkerSchema.find({
      ownerId: Id,
      status: "Availible",
    });
    if (workers.length < 1) {
      return { worker: null };
    } else if (workers.length > 1) {
      return { worker: workers[0].id };
    }
  } catch (err) {}
};
