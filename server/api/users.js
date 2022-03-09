const router = require('express').Router()

const { models: { User } } = require('../db')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
const Order = require('../db/models/Order')
const OrderDetails = require('../db/models/OrderDetails') 
const Product = require('../db/models/Product')
module.exports = router

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    console.log(req.params.userId)
    const orders = await User.findByPk(req.params.userId, {
      include: {
        model: Order,
        include: [Product]
      },
    })
    res.json(orders);
  } catch (error) {
    next(error)
  }
}) 

router.put('/:id', async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          where: {
            status: 'unfulfilled',
          },
          required: false,
          include: [Product],
        }
      ]
    })
    let currentOrder = {};
    if (currentUser.orders.length) {
      currentOrder = currentUser.orders[0];
    } else {
      currentOrder = await Order.create({ userId: currentUser.id});
    }
    console.log(req.body)
    await currentOrder.incrementProduct(
      req.body.productId,
      req.body.quantityChange
    )
    const updatedOrder = await User.findByPk(currentUser.id, { 
      include: {
        model: Order,
        include: [Product]
      },
    })
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
})

router.put('/:id/checkout', async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          where: {
            status: 'unfulfilled',
          },
          required: false,
          include: [Product],
        }
      ]
    });
    let currentOrder = {};
    if (currentUser.orders.length) {
      currentOrder = currentUser.orders[0];
      await currentOrder.update({ status: "fulfilled" });
    } else {
      throw new Error("empty cart");
    }
    res.json(currentOrder);
  } catch (error) {
    next(error);
  }

})
