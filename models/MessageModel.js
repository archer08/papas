const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  // connectionId: { type: String, required: true },
  sender: { type: String, required: true },
  reciever: { type: String, required: true },
  message: { type: String, required: true },

  data: {
    coversation: { type: String, required: true },
    timeSent: { type: Date, required: true },
    timeSeen: { type: Date },
    messageType: { type: String, required: true },
    rtm: { type: String },
    platform: { sent: { type: Sting }, recieved: { type: String } },
    api: { type: Boolean, required: true },
    encrypted: { type: Boolean, required: true, default: false },
    status: { type: String, required: true },
  },
});
const MessageModel = model("Message", MessageSchema);

module.exports = MessageModel;
