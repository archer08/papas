const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  phoneNumber: {
    type: String,
    required: [true, "please add a phone number"],
    unique: true,
  },
  age: Number,
  email: { type: String, required: true, unique: true },
  role: { type: String, required: [true, "please enter a roll"] },
  workerLimit: { type: Number, required: [true, "please add a worker limit"] },
});
const UserModel = model("User", UserSchema);

module.exports = UserModel;
