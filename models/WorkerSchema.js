const { Schema, model } = require("mongoose");

const WorkerSchema = new Schema({
  phoneNumber: Number,
  ownerId: String,
  task: String,

  status: { type: String, requied: true },
});

module.exports = model("Worker", WorkerSchema);
