const { Schema, model } = require("mongoose");

const ConversationSchema = new Schema({
  host: { type: String, required: true },
  participant: { type: String, required: true },

  data: {
    status: { type: String, required: true, default: "active" },
    workerId: { type: String, required: true },
    connectionTime: { type: Number, default: "none" },
  },
});

module.exports = model("Conversation", ConversationSchema);
