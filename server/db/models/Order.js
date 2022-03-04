const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER
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