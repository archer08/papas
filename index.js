const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/db.js");
connectDb();
const gql = require("./config/gql.js");
gql();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const colors = require("colors");
const twilloRoutes = require("./routes/twilloRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const Vonage = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "5a170902",
  apiSecret: "Lfj8ib3oGIVR7Uts",
});
const from = "18773315585";
const to = "19143866407";
const text = "A text message sent using the Vonage SMS API";

vonage.message.sendSms(from, to, text, (err, responseData) => {
  if (err) {
    console.log(err);
  } else {
    if (responseData.messages[0]["status"] === "0") {
      console.log("Message sent successfully.");
    } else {
      console.log(
        `Message failed with error: ${responseData.messages[0]["error-text"]}`
      );
    }
  }
});

// creating 24 hours from milliseconds
// const oneDay = 1000 * 60 * 60 * 24;
// app.use(cookieParser());

//session middleware
// app.use(
//   sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized: true,
//     cookie: { maxAge: oneDay },
//     resave: false,
//   })
// );

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/twilio", twilloRoutes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
