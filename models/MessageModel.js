const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  connectionId: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
});
const MessageModel = model("Message", MessageSchema);

module.exports = MessageModel;
