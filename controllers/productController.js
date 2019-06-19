import models from "../models";

class productController {
  static async getProducts() {
    let products = await models.products.findAll();
    return products.map(product => product.dataValues);
  }
  static async getProduct(id) {
    let product = await models.products.findOne({
      where: { id: id }
    });
    return product ? product.dataValues : null;
  }
  static async findOrCreate(data) {
    let [product, created] = await models.products.findOrCreate({
      where: { name: data.name },
      defaults: data
    });
    if (created) {
      return product.dataValues;
    } else {
      return null;
    }
  }
  static async findByName(name) {
    let product = await models.products.findOne({
      where: { email: name }
    });
    return product ? product.dataValues : null;
  }

  static async update(data) {
    let status = await models.products.update(data, { where: { id: data.id } });
    if (status[0]) {
      return data;
    } else {
      return null;
    }
  }
  static async delete(data) {
    let res = await models.products.destroy({ where: { id: data.id } });
    if (res) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = productController;
