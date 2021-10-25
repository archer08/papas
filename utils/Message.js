const Message = require("../models/MessageModel.js");
const StockModel = require("../models/StockModel.js");

exports.saveMessage = async (msg, sender, reciever, status, date) => {
  try {
    await Message.create({ message: msg, sender, reciever, status, date });
    return { status: "Success" };
  } catch (err) {
    return { status: "Error", error: err };
  }
};

exports.sortMessages = async (array) => {
  const sortedDates = array.sort((dateA, dateB) => dateA.date - dateB.date);
  return sortedDates;
};
exports.checkMessage = async (msg, num) => {
  console.log(msg);
  const command = msg.split(":")[0];
  console.log(command);
  const message = msg.split(":")[1];
  console.log(message);

  switch (command) {
    case "ws":
      const stock = await StockModel.findOne({ name: message });
      return stock.stock;
    case "s+":
      stock = await StockModel.findOne({ name: message });
      stock.stock = stock.stock + num;
      await stock.save();
      return stock.stock;
    case "s-":
      stock = await StockModel.findOne({ name: message });
      stock.stock = stock.stock - num;
      await stock.save();
      return stock.stock;
    case "m":
      return `this is your message: ${msg}`;
  }
};
