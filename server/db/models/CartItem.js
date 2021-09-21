const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = CartItem;
