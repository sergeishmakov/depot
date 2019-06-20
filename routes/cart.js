import cartController from "../controllers/cartController";

const cartRouter = {
  addToCart(req, res) {
    console.log(req.body);
    res.json(true);
  },
  getCart(req, res) {
    cartController.getCart(req.user.id).then(products => {
      res.json(products);
    });
  }
};

export default cartRouter;
