const { Schema, model } = require("mongoose");

const PtpCSchema = new Schema({
  hostNumber: { type: String, required: true },
  receiverNumber: { type: String, required: true },
  connectionTime: { type: Number },
  workerId: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = model("PeerToPeer", PtpCSchema);
