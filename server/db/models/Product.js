const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Dark-Mocha-2-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1616187367',
    validate: {
      isUrl: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
  },
  gender: {
    type: Sequelize.STRING,
    defaultValue: 'male'
  }
})

module.exports = Product;