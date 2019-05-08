import userController from "../controllers/userController";

export default async (req, res) => {
  const items = await userController.all();
  res.render("users", {
    users: items
  });
};
