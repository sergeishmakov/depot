"use strict";
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define(
    "cart",
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );
  cart.associate = function(models) {
    // associations can be defined here
  };
  return cart;
};
