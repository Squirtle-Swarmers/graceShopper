const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'unfulfilled',
    validate: {
      isIn: [['fulfilled', 'unfulfilled']]
    }
  }
})

module.exports = Order;