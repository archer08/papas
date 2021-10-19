const user = require("../models/usrSchema.js");
const { body, validationResult, check } = require("express-validator");

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  res.status(200).json({});
};
exports.getUser = (req, res, next) => {
  res.status(200).json({});
};
exports.updateUser = (req, res, next) => {
  res.status(200).json({});
};
