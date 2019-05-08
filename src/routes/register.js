const userController = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const saltLength = 12;

exports.form = (req, res) => {
  res.render("register", {
    failed: req.session.failed,
    errors: req.session.errors
  });
  req.session.failed = false;
  req.session.errors = null;
};

exports.submit = async (req, res) => {
  req.session.failed = false;
  req.session.errors = [];
  req.check("email", "Invalid email addres").isEmail();
  req.check("password", "The password is too short").isLength({ min: 5 });
  req.check("password", "Password do not match").equals(req.body.confirmPassword);

  if (req.validationErrors()) {

    req.session.errors = req.validationErrors();
    req.session.failed = true;
    res.redirect("back");

  } else {
    let item = await userController.findOne(req.body.email);

    if (item) {
      addErrors(req, "db", "A user with this email already exists.", item.email);
      res.redirect("back");
    } else {

      let user = await createObjectUser(saltLength, req.body.password, req.body.email);
      console.log("User", user);
      let item = await userController.create(user);

      if (item) {

        res.redirect("/");

      } else {

        addErrors("db", "An error occurred on the server try again", "fail");
        res.redirect("back");

      }
    };
  }
};

const addErrors = (req, param, msg, value) => {
  req.session.errors.push({
    param: param,
    msg: msg,
    value: value
  });
  req.session.failed = true;
}

const createObjectUser = async (saltLength, password, email) => {
  let salt = await bcrypt.genSaltSync(saltLength);
  let hashPassword = bcrypt.hashSync(password, salt);
  let user = {
    email: email,
    password: hashPassword,
    salt: salt
  }
  return user;
}


