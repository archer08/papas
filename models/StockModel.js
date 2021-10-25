const { Schema, model } = require("mongoose");

const StockSchema = new Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  numberSold: { type: Number, required: true },
});
const StockModel = model("Stock", StockSchema);

module.exports = StockModel;
