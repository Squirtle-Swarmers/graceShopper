const router = require('express').Router()
const { models: { OrderDetails, Order }} = require('../db')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Product.findByPk(req.params.orderId)
    res.json(order);
  }
  catch (err) {
    next(err);
  }
});