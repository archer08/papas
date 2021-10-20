const express = require("express");
const router = express.Router();
const {
  twilloPtpConnectionRequestController,
} = require("../config/twilloConfig.js");

router.route("/").get(twilloPtpConnectionRequestController);

module.exports = router;
