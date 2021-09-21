//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");

Product.hasMany(CartItem);
CartItem.belongsTo(Product);
User.hasMany(CartItem);
CartItem.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
  },
};
