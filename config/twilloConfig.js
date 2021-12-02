const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const PtpCModel = require("../models/PtpCModel.js");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const MessageModel = require("../models/MessageModel.js");
const { saveMessage, checkMessage } = require("../utils/Message.js");
const { MessageHandler, SendSms } = require("../functions/Sms");

exports.twilloPtpConnectionRequestController = async (req, res, next) => {
  const session = req.session;
  const conversation = session.conversation;
  if (!conversation) {
    if (!session.numberRequested) {
      SendSms("18773315585", "19143866407", "Who will you like to message");
      session.numberRequested = true;
    }
  }

  // gather all data from from request
  const {
    SmsStatus: status,
    Body: message,
    To: Worker,
    From: sender,
  } = req.query;

  res.sendStatus(204);
};
