'use strict';
export default (sequelize, DataTypes) => {
  const User = sequelize.define ('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  });

  return User;
};
