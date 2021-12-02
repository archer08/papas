const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/db.js");
connectDb();
const gql = require("./config/gql.js");
gql();
const express = require("express");
const colors = require("colors");
const twilloRoutes = require("./routes/twilloRoutes.js");
const app = express();
const userRoute = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(cookieParser());

const profile = {
  income: 0,
  expences: 0,
  transactions: {},
};
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/twilio", twilloRoutes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
