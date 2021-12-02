const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const PtpCModel = require("../models/PtpCModel.js");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const MessageModel = require("../models/MessageModel.js");
const { saveMessage, checkMessage } = require("../utils/Message.js");
const { MessageHandler } = require("../functions/Sms");

exports.twilloPtpConnectionRequestController = async (req, res, next) => {
  const twiml = new MessagingResponse();

  // const session = req.session;
  // const currentConversation = session.currentConversation;
  // if (!currentConversation) {
  //   if (!session.numberRequested) {
  //     twiml.message("Who will you like to message");
  //     session.numberRequested = true;
  //   }
  // }
  twiml.message("Who will you like to message");

  // gather all data from from request
  const {
    SmsStatus: status,
    Body: message,
    To: Worker,
    From: sender,
  } = req.query;
  setTimeout(() => {}, 60000);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
};

const requestMessage = (msg) => {
  const twiml = new MessagingResponse();
  twiml.message(msg);
};
