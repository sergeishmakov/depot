import models from '../models';
import bcrypt from 'bcryptjs';
const saltLength = 12;

const hashPassword = async data => {
  let salt = await bcrypt.genSaltSync (saltLength);
  let hashedPassword = await bcrypt.hashSync (data.password, salt);
  data.password = hashedPassword;
  data.salt = salt;
  return data;
};

class userController {
  static async findOrCreate (data) {
    return models.users.findOrCreate ({
      where: {email: data.email},
      defaults: await hashPassword (data),
    });
  }
  static async findById (id) {
    let item = await models.users.findOne ({
      where: {id: id},
    });
    return item.dataValues;
  }
  static async findOne (email) {
    let item = await models.users.findOne ({
      where: {email: email},
    });
    return item.dataValues;
  }
  static validPassword (password, user) {
    if (bcrypt.hashSync (password, user.salt) === user.password) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = userController;
