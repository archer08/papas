const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const PtpCModel = require("../models/PtpCModel.js");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const MessageModel = require("../models/MessageModel.js");
const { saveMessage, checkMessage } = require("../utils/Message.js");

exports.StartPtpConnection = async (
  HostNumber,
  recieverNumber,
  connectionTime
) => {
  try {
    const check = await PtpCModel.find({ hostNumber, status: "live" });
    if (!check.length <= 0) {
      return "ptpConnection alreadty establshed please end connection.";
    } else {
      const connection = await PtpCModel.create({
        hostNumber,
        recieverNumber,
        connectionTime,
        status: "Pending",
      });
    }
  } catch (err) {}
};
const sendMessage = async (msg, from, to) => {
  try {
    client.messages
      .create({ body: `${msg}`, from, to })
      .then((message) => console.log(message.sid));
  } catch (err) {
    console.log(err);
  }
};
exports.twilloPtpConnectionRequestController = async (req, res, next) => {
  const twiml = new MessagingResponse();
  const {
    SmsStatus: status,
    Body: msg,
    To: reciever,
    From: sender,
  } = req.query;

  saveMessage(msg, sender, reciever, status);
  if (PtpConnectionChecker(sender)) {
    twiml.message("Connection already estableshed");
    // saveMessage("Connection already estableshed", reciever, );
  }
  const vars = { HostNumber: sender, recieverNumber: reciever };
  // const sortedDates = arrayOfDates.sort((dateA, dateB) => dateA.date - dateB.date)
  const check = await checkMessage(msg, vars);
  console.log(`check: ${check}`);

  twiml.message(check);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
};

const PtpConnectionChecker = async (number) => {
  const data = await PtpModel.find({ hostNumber: number, status: "Active" });
  const check = data.length <= 0;
  if (check) {
    return false;
  } else {
    return true;
  }
};

const requestMessage = (msg) => {
  const twiml = new MessagingResponse();
  twiml.message(msg);
};

const PtpActiveConnectionHandler = async (message, sender) => {
  const check = PtpConnectionChecker(sender);
  if (sender !== false) {
    const message = await MessageModel.create({
      message,
      sender,
      connection: check.id,
    });
  }
};
