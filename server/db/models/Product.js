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
    defaultValue: 'https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image.jpg',
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