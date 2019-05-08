import models from "../models";

class userController {
  static all() {
    try {
      return models.users.findAll({ order: ["createdAt"] });
    } catch (err) {
      return "Error on server";
    }
  }
  static create(data) {
    try {
      return models.users.create(data);
    } catch (err) {
      return "Error on server";
    }
  }
  static findOne(email) {
    try {
      return models.users.findOne({ where: { email: email } });;
    } catch (err) {
      return "Error on server";
    }
  }
}
module.exports = userController;
