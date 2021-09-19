const express = require("express");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");
const user = require("../models/user");
const router = express.Router();

router
  .route("/register")
  .get(users.showRegisterForm)
  .post(catchAsync(users.addNewUser));

router
  .route("/login")
  .get(users.showlogInFrom)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
