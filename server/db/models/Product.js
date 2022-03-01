const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  price: {
    type: Sequelize.FLOAT(2),
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'No description available'
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
    defaultValue: 0
  },
  gender: {
    type: Sequelize.STRING,
    defaultValue: 'male'
  }
})

module.exports = Product;