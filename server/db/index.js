//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const OrderDetails = require('./models/OrderDetails')

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, {
  through: OrderDetails,
});

Order.belongsToMany(Product, {
  through: OrderDetails,
});

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderDetails
  },
}

//methods
Order.prototype.incrementProduct = async function (productId, quantity) {
  const products = await this.getProducts();
  const productsFiltered = products.filter(product => product.id === productId);

  const cart = await OrderDetails.findAll({
    where: {
      orderId: this.id,
      productId: productId,
    },
  });
  if(!quantity){
    await this.removeProduct(productId);
  } else {
    let updatedQuantity = productsFiltered.length ? cart[0].quantity + quantity : quantity;
    await this.addProduct(productId, { through: { quantity: updatedQuantity } });
  }
}