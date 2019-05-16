import userController from '../controllers/userController';

const registerRouter = {
  async submit (req, res) {
    let user = await userController.findOrCreate (req.body);
    res.json (user);
  },
};

export default registerRouter;
