const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const PtpCModel = require("../models/PtpCModel.js");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const MessageModel = require("../models/MessageModel.js");

const StartPtpConnection = async (
  HostNumber,
  recieverNumber,
  connectionTime
) => {
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
    this.sendMessage(
      `Connection started with ${recieverNumber}`,
      HostNumber,
      recieverNumber
    );
  }
};

exports.twilloPtpConnectionRequestController = (req, res, next) => {
  // if (req.query.From === "+19243866407") {
  //   const msg = req.query.Body;
  //   msg = msg.split(":");
  //   const To = msg[0];
  //   const message = msg[1];
  // }
  // console.log(req.query.From);
  
  client.messages.create({
    body: `InComming Message From: ${req.query.From}\n
    ${req.query.Body}`,
    from: "+14124304517",
    to: "+19143866407",
  });
  res.end();
};
const PtpConnectionChecker = async (number) => {
  const data = await PtpModel.find({ hostNumber: number, status: "Active" });
  const data2 = await PtpModel.find({
    receiverNumber: number,
    status: "Active",
  });
  const check = data.length <= 0;
  const check2 = data2.length <= 0;
  if (!check) {
    return data;
  }
  if (!check2) {
    return data2;
  }
  return false;
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

const commandDirectory = (cmd) => {
  switch (cmd) {
    case "ptp":
      return;

    default:
      break;
  }
};

exports.sendMessage = async (message, from, to) => {
  client.messages
    .create({ body: message, from, to })
    .then((message) => console.log(message.sid));
};
const proccessMsg = () => {
  msg = req.body.Body;
  if (msg.contains(":")) {
    const splitMsg = msg.split(":");
    if (splitMsg[0] in commandDirectory) {
    }
  }
};

exports.TwiloMsgRoute = (req, res) => {
  const twiml = new MessagingResponse();
  let msg = request.body.Body;

  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
};
