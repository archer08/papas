const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/db.js");
const gql = require("./config/gql.js");
gql();

const express = require("express");
const colors = require("colors");
const UserModel = require("./models/usrSchema.js");
const twilloRoutes = require("./routes/twilloRoutes.js");

const app = express();

connectDb();

const userRoute = require("./routes/userRoutes.js");

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/twilio", twilloRoutes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
