const Sequelize = require('sequelize');
const db = require('../db');

const OrderDetails = db.define('orderDetails', {
  purchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
})

module.exports = OrderDetails;