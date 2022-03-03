const router = require('express').Router()
const { models: { OrderDetails, Order }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders);
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    res.json(order);
  }
  catch (err) {
    next(err);
  }
});

router.get('/:orderId/details', async (req, res, next) => {
  try {
    const orderDetails = await OrderDetails.findAll({where: {orderId: req.params.orderId}})
    res.json(orderDetails);
  } catch (error) {
    next(error)
  }
})

//consider doing price low - high after t1 is done