const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

// GET /api/products for ALL products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET api/products/productId for SINGLE product
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST api/products/productId for ADMIN privileges
router.post('/:productId', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// PUT api/products/productId for ADMIN privileges
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(await product.update(req.body));
  } catch (err) {
    next(err);
  }
});