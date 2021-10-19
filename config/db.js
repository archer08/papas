const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true,
  });
};

module.exports = connectDb;
