import userController from '../controllers/userController';

const registerRoutes = {
  async submit (req, res) {
    let user = await userController.findOrCreate (req.body);
    res.json (user);
  },
};

export default registerRoutes;
