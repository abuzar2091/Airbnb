const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userControllers=require("../controllers/user.js");

router.route("/signup")
  .get(userControllers.signupFormRender)
  .post(userControllers.signup);


router.route("/login")
  .get( userControllers.loginFormRender)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
  wrapAsync( userControllers.login)
  );

router.get("/logout",userControllers.logout);

module.exports = router;
//"A user with the given username is already registered"
