const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const PtpCModel = require("../models/PtpCModel.js");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const MessageModel = require("../models/MessageModel.js");
const { saveMessage, checkMessage } = require("../utils/Message.js");
const {
  MessageHandler,
  SendSms,
  CreateConversationHandler,
} = require("../functions/Sms");
import validator from "validator";
const addMessage = (session) => {
  session.conversation.messages.concat(message);
};
exports.twilloPtpConnectionRequestController = async (req, res, next) => {
  const session = req.session;
  session.from = req.body;
  const conversation = session.conversation;
  const last_message = session.last_message;
  // if (!conversation) {
  //   SendSms("18773315585", "19143866407", ptpStatusHandler(session));
  // }

  // gather all data from from request
  // const {
  //   SmsStatus: status,
  //   Body: message,
  //   To: Worker,
  //   From: sender,
  // } = req.query;
  console.log(req.body);

  res.sendStatus(204);
};

const ptpStatusHandler = (session, message) => {
  const status = {
    1: "Who will you like to message:",
    2: "Please provide a number:",
    3: "initiating connection",
    4: "connected",
  };
  switch (session.status) {
    case 0:
      session.status = 1;
      return status[1];
    case 1:
      session.status = 2;
      return status[2];
    case 2:
      const options = { strictMode: true };
      const phoneNumber = validator.isMobilePhone(meassage, options);
      if (phoneNumber) {
        CreateConversationHandler();
      }
      session.status = 3;
      if (!session.connection) return status[3];

    default:
      session.status = 1;
      return status[1];
  }
};
