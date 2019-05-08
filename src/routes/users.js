const userController = require("../controllers/userController");

exports.form = async (req, res) => {
  const items = await userController.all();
  res.render("users", {
    users: items
  });
};
