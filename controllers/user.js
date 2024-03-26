const User = require("../models/user");

module.exports.signupFormRender= (req, res) => {
    res.render("users/signup.ejs");
  }

module.exports.signup= async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registerdUser = await User.register(newUser, password);
      req.login(registerdUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Successfully Signed Up!");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("failure", err.message);
      res.redirect("/signup");
    }
  }


  module.exports.loginFormRender=(req, res) => {
    res.render("users/login.ejs");
  }

  module.exports.login=async (req, res) => {
    req.flash("success", "Successfully logged In!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

  }


  module.exports.logout=(req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Successfully Logged Out!");
      res.redirect("/listings");
    });
  }