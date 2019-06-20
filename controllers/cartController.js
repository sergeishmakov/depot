import models from "../models";

class cartController {
  static async getCart(id) {
    let cart = await models.cart.findAll({ where: { userId: id } });
    let filtercart = cart.map(item => item.dataValues);
    let arr = filtercart.map(({ productId }) => productId);
    let products = await models.products.findAll({
      where: { id: arr }
    });

    products = products.map(product => product.dataValues);
    products.forEach(product => {
      product.count = arr.filter(x => x === product.id).length;
      return product;
    });

    // for (var i = 0; i < products.length; i++) {
    //   products[i].count = arr.filter(x => x === products[i].id).length;
    // }

    return products;
  }
}
export default cartController;
