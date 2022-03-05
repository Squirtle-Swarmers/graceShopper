const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

// GET api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// POST api/products
router.post('/', async (req, res, next) => {
  try {
    const newProduct = req.body;
    console.log('[ POST api/products ] req.body: ', req.body)
    res.status(201).send(await Product.create(newProduct))
  } catch (error) {
    next (error)
  }
})

// GET api/products/productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product);
  }catch (err) {
    next(err);
  }
});
