const User = require("../models/user");

module.exports.showRegisterForm = (req, res) => {
  res.render("user/register");
};

module.exports.addNewUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) return next();
      req.flash("success", "WellCome To Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.showlogInFrom = (req, res) => {
  res.render("user/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "WellCome Back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "SuccessFully Logg Out");
  res.redirect("/");
};
