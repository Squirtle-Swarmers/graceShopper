const router = require('express').Router()
const { models: { OrderDetails, Order, Product }} = require('../db')
module.exports = router

// GET /api/orders for ALL orders (ADMIN)
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Product,
        attributes: ['name']
      }
    })
    res.json(orders);
  } catch (error) {
    next(error)
  }
})

// GET /api/orders/:orderId for SINGLE order 
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {id: req.params.orderId},
      include: {
        model: Product,
        attributes: ['name']
      }
    })
    console.log(Object.keys(Order.prototype))
    res.json(order);
  } catch (error) {
    next(error)
  }
});

// POST /api/orders/:orderId for starting order
router.post('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    res.json(order);
  } catch (error) {
    next(error)
  }
});

// PUT /api/orders/:orderId for modifying cart
router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {id: req.params.orderId},
      include: {
        model: Product,
        attributes: ['name']
      }
    })
    await order.setProducts(req.body)
    res.json(order);
  } catch (err) {
    next(err);
  }
});

//consider doing price low - high after t1 is done