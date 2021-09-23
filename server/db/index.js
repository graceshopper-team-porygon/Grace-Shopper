//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");

Product.hasMany(CartItem);
CartItem.belongsTo(Product);
User.hasMany(CartItem);
CartItem.belongsTo(User);
User.hasMany(Order);
Order.hasMany(CartItem);

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    Order,
  },
};
