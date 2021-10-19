const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.NotifyOwner = (msg) => {
  client.messages
    .create({ body: msg, from: "+15017122661", to: process.env.OWNNUMBER })
    .then((message) => console.log(message.sid));
};
