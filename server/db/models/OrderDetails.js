const Sequelize = require('sequelize');
const db = require('../db');

const OrderDetails = db.define('orderDetails', {
  productId: {
    type: Sequelize.INTEGER
  },
  orderId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
})

module.exports = OrderDetails;