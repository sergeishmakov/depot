"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "products",
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      category: DataTypes.STRING,
      model: DataTypes.STRING,
      instock: DataTypes.STRING,
      date: DataTypes.STRING,
      description: DataTypes.STRING,
      firm: DataTypes.STRING,
      price: DataTypes.STRING
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
