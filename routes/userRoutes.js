const express = require("express");
const router = express.Router();
const { getUser, createUser, updateUser } = require("../controller/Users.js");
const { body, validationResult, check } = require("express-validator");
const User = require("../models/usrSchema.js");
const {
  twilloPtpConnectionRequestController,
} = require("../config/twilloConfig.js");

router
  .route("/")
  .get(getUser)
  .post(
    [
      check("email").custom(async (value) => {
        const findEmail = await User.find({ email: value });
        if (!findEmail.length <= 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
      body("firstname").notEmpty(),
      body("lastname").notEmpty(),
      body("phoneNumber")
        .isMobilePhone()
        .custom(async (value) => {
          const findEmail = await User.find({ phoneNumber: value });
          if (!findEmail.length <= 0) {
            return Promise.reject("Phone Number already in use");
          }
        }),
      body("password")
        .isLength({ min: 10, max: 20 })
        .custom(async (value) => {
          const findEmail = await User.find({ password: value });
          if (!findEmail.length <= 0) {
            return Promise.reject("Password already in use");
          }
        }),
      body("age").isNumeric(),
      body("role").contains([]),
    ],
    createUser
  )
  .put(updateUser);
router.route("/twillo").post(twilloPtpConnectionRequestController);

module.exports = router;
