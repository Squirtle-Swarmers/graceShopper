const router = require('express').Router()
const { models: { Product } } = require('../db')
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')

// GET api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// POST api/products [ admin ]
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const newProduct = req.body;
    console.log('// [ POST api/products ] req.body: ', req.body)
    res.status(201).send(await Product.create(newProduct))
  } catch (error) {
    next(error)
  }
})

// GET api/products/productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE api/products/productId [ admin ]
router.delete("/:productId", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToBeDeleted = await Product.findByPk(req.params.productId);
    await productToBeDeleted.destroy();
    res.send(productToBeDeleted);
  } catch (error) {
    next(error);
  }
});

// PUT api/products/productId [ admin ]
router.put("/:productId", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToBeUpdated = await Product.findByPk(req.params.productId);
    const updatedProduct = await productToBeUpdated.update(req.body);
    res.send(updatedProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router