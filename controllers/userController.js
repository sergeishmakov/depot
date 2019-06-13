import models from "../models";
import bcrypt from "bcryptjs";
const saltLength = 12;

const hashPassword = async data => {
  let salt = await bcrypt.genSaltSync(saltLength);
  let hashedPassword = await bcrypt.hashSync(data.password, salt);
  data.password = hashedPassword;
  data.salt = salt;
  return data;
};

class userController {
  static async getUsers() {
    let users = await models.users.findAll();
    return users.map(user => user.dataValues);
  }
  static async findOrCreate(data) {
    return models.users.findOrCreate({
      where: { email: data.email },
      defaults: await hashPassword(data)
    });
  }
  static async findById(id) {
    let item = await models.users.findOne({
      where: { id: id }
    });
    return item ? item.dataValues : null;
  }
  static async findOne(email) {
    let item = await models.users.findOne({
      where: { email: email }
    });

    return item ? item.dataValues : null;
  }

  static async update(data) {
    let status = await models.users.update(data, { where: { id: data.id } });
    if (status[0]) {
      return data;
    } else {
      return null;
    }
  }
  static async delete(data) {
    let res = await models.users.destroy({ where: { id: data.id } });
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  static validPassword(password, user) {
    if (bcrypt.hashSync(password, user.salt) === user.password) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = userController;
