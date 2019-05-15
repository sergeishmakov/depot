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
}
module.exports = userController;
